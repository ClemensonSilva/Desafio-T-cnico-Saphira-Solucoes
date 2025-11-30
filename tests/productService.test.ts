import { prisma } from '../src/lib/prisma'; // 1. Importe o prisma original (que será mockado)
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import {productsService} from '../src/services/productsService';

jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

const mockProduct = {
    id: 1,
    name: 'Laptop Gamer',
    price: 5000,
    categoryId: 10,
    category: { id: 10, name: 'Eletrônicos' }
};


describe('ProductsService', () => {
    beforeEach(() => {
        (mockPrisma.product as any).mockClear(); 
        jest.clearAllMocks();
    });
    
    describe('getProductById', () => {
        it('deve retornar um produto quando o ID for encontrado', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(mockProduct as any);

            const result = await productsService.getProductById(1);

            expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockProduct);
        });

        it('deve retornar null se o ID do produto não for encontrado', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(null);

            const result = await productsService.getProductById(999);

            expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({
                where: { id: 999 },
            });
            expect(result).toBeNull();
        });
    });

    describe('getAllProducts', () => {
        const mockProductList = [
            { id: 2, name: 'Mouse', price: 100 },
            { id: 1, name: 'Teclado', price: 200 },
        ];

        it('deve retornar todos os produtos ordenados por preço ascendente', async () => {
            mockPrisma.product.findMany.mockResolvedValue(mockProductList as any);

            const result = await productsService.getAllProducts();

            expect(mockPrisma.product.findMany).toHaveBeenCalledWith({
                orderBy: { price: 'asc' }
            });
            expect(result).toEqual(mockProductList);
            expect(result).toHaveLength(2);
        });

        it('deve retornar um array vazio se não houver produtos', async () => {
            mockPrisma.product.findMany.mockResolvedValue([]);

            const result = await productsService.getAllProducts();

            expect(mockPrisma.product.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual([]);
        });
    });

    describe('searchProductsByName', () => {
        it('deve retornar produtos cujo nome contenha o termo de busca (case-insensitive)', async () => {
            const searchResults = [{ id: 1, name: 'Camiseta Azul' }];
            const searchTerm = 'cami';
            
            mockPrisma.product.findMany.mockResolvedValue(searchResults as any);

            const result = await productsService.searchProductsByName(searchTerm);

            expect(mockPrisma.product.findMany).toHaveBeenCalledWith({
                where: {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            });
            expect(result).toEqual(searchResults);
        });
    });

    describe('deleteProductById', () => {
        it('deve retornar o produto deletado após a exclusão bem-sucedida', async () => {
            mockPrisma.product.delete.mockResolvedValue(mockProduct as any);

            const result = await productsService.deleteProductById(1);

            expect(mockPrisma.product.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockProduct);
        });
        
        it('deve propagar o erro se o produto a ser deletado não for encontrado', async () => {
            const prismaError = new Error('Product not found for deletion');
            mockPrisma.product.delete.mockRejectedValue(prismaError);

            await expect(productsService.deleteProductById(999)).rejects.toThrow(prismaError);
        });
    });

    describe('getProductsByCategory', () => {
        it('deve retornar produtos de uma categoria específica com o campo de categoria incluído', async () => {
            const categoryId = 5;
            const mockCategoryResults = [
                { id: 3, name: 'Livro de JS', categoryId: 5, category: { id: 5, name: 'Livros' } }
            ];

            mockPrisma.product.findMany.mockResolvedValue(mockCategoryResults as any);

            const result = await productsService.getProductsByCategory(categoryId);

            expect(mockPrisma.product.findMany).toHaveBeenCalledWith({
                where: { categoryId: categoryId },
                orderBy: { price: 'asc' },
                include: { category: true },
            });
            expect(result).toEqual(mockCategoryResults);
            expect(result[0].category.name).toBe('Livros');
        });
    });
});