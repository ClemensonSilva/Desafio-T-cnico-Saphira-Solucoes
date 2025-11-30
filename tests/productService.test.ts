import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { productsService } from '../src/services/productsService';
import { categoryService } from '../src/services/categoryServices';
import { prisma } from '../src/lib/prisma';
import { NotFoundError } from '@/exceptions';

// Mock do Prisma
jest.mock('../src/lib/prisma', () => ({
    __esModule: true,
    prisma: mockDeep<PrismaClient>(),
}));

// Mock do CategoryService (dependência externa)
jest.mock('../src/services/categoryServices', () => ({
    categoryService: {
        getCategoryByName: jest.fn(),
    }
}));

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

// Dados de exemplo
const mockCategory = { id: 1, name: 'Hardware', image: 'img.jpg' };
const mockProduct = { 
    id: 10, 
    name: 'Placa de Vídeo', 
    price: 1500, 
    categoryId: 1, 
    description: 'GPU' 
};

describe('ProductsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getProductById', () => {
        it('deve retornar o produto se encontrado', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(mockProduct as any);
            const result = await productsService.getProductById(10);
            expect(result).toEqual(mockProduct);
        });

        it('deve retornar null se não encontrado', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(null);
            const result = await productsService.getProductById(999);
            expect(result).toBeNull();
        });
    });

    describe('getAllProducts', () => {
        it('deve retornar lista de produtos ordenada', async () => {
            mockPrisma.product.findMany.mockResolvedValue([mockProduct] as any);
            const result = await productsService.getAllProducts();
            expect(result).toEqual([mockProduct]);
            expect(mockPrisma.product.findMany).toHaveBeenCalledWith({
                orderBy: { price: 'asc' }
            });
        });

        it('deve lançar NotFoundError se a lista estiver vazia', async () => {
            mockPrisma.product.findMany.mockResolvedValue([]);
            await expect(productsService.getAllProducts())
                .rejects
                .toThrow(NotFoundError);
        });
    });

    describe('deleteProductById', () => {
        it('deve deletar se o produto existir', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(mockProduct as any);
            mockPrisma.product.delete.mockResolvedValue(mockProduct as any);

            const result = await productsService.deleteProductById(10);

            expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 10 } });
            expect(mockPrisma.product.delete).toHaveBeenCalledWith({ where: { id: 10 } });
            expect(result).toEqual(mockProduct);
        });

        it('deve lançar NotFoundError se o produto não existir (antes de tentar deletar)', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(null);

            await expect(productsService.deleteProductById(999))
                .rejects
                .toThrow("Produto não encontrado ou erro ao deletar");
            
            expect(mockPrisma.product.delete).not.toHaveBeenCalled();
        });
    });

    describe('getProductsByCategory', () => {
        it('deve retornar produtos da categoria', async () => {
            mockPrisma.product.findMany.mockResolvedValue([mockProduct] as any);
            const result = await productsService.getProductsByCategory(mockCategory as any);
            
            expect(mockPrisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: { categoryId: mockCategory.id }
            }));
            expect(result).toEqual([mockProduct]);
        });
    });

    describe('getProductsByName', () => {
        it('deve lançar NotFoundError se nenhum nome der match', async () => {
            mockPrisma.product.findMany.mockResolvedValue([]);
            
            await expect(productsService.getProductsByName('Inexistente'))
                .rejects
                .toThrow(NotFoundError);
        });

        it('deve retornar produtos se houver match', async () => {
            mockPrisma.product.findMany.mockResolvedValue([mockProduct] as any);
            const result = await productsService.getProductsByName('Placa');
            expect(result).toEqual([mockProduct]);
        });
    });

    describe('getProductsByFilter', () => {
        it('deve chamar getAllProducts se sem filtros', async () => {
            const spyGetAll = jest.spyOn(productsService, 'getAllProducts')
                .mockResolvedValue([mockProduct] as any);
            
            await productsService.getProductsByFilter();
            expect(spyGetAll).toHaveBeenCalled();
        });

        it('deve lançar erro se a categoria filtrada não existir no CategoryService', async () => {
            (categoryService.getCategoryByName as jest.Mock).mockRejectedValue(new NotFoundError('Cat fail')); // ou retorna null dependendo da sua impl

            await expect(productsService.getProductsByFilter('Fantasma', undefined))
                .rejects
                .toThrow(); 
        });

        it('deve filtrar corretamente e retornar produtos', async () => {
            (categoryService.getCategoryByName as jest.Mock).mockResolvedValue(mockCategory);
            mockPrisma.product.findMany.mockResolvedValue([mockProduct] as any);

            await productsService.getProductsByFilter('Hardware', 'Placa');

            expect(mockPrisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: {
                    AND: expect.arrayContaining([
                        { categoryId: 1 },
                        { name: { contains: 'Placa', mode: 'insensitive' } }
                    ])
                }
            }));
        });
    });
});