import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { categoryService } from '../src/services/categoryServices'; 

const mockPrisma = mockDeep<PrismaClient>();

jest.mock('../../src/lib/prisma', () => ({
  prisma: mockPrisma,
}));

const mockCategory = { id: 1, name: 'Eletrônicos' };

describe('CategoryService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCategories', () => {
        it('deve retornar todas as categorias ordenadas por nome', async () => {
            const mockCategoriesList = [
                { id: 2, name: 'Casa e Banho' },
                { id: 1, name: 'Eletrônicos' }
            ];
            
            mockPrisma.category.findMany.mockResolvedValue(mockCategoriesList as any);

            const result = await categoryService.getAllCategories();

            expect(mockPrisma.category.findMany).toHaveBeenCalledWith({
                orderBy: { name: 'asc' }
            });
            expect(result).toEqual(mockCategoriesList);
        });

        it('deve lançar erro genérico se o banco falhar', async () => {
            mockPrisma.category.findMany.mockRejectedValue(new Error('Database connection failed'));

            await expect(categoryService.getAllCategories())
                .rejects
                .toThrow("Falha na operação de banco de dados.");
        });
    });

    describe('getCategoryById', () => {
        it('deve retornar null se o categoryId for inválido (0, null, undefined)', async () => {
            const result = await categoryService.getCategoryById(0);

            expect(result).toBeNull();
            expect(mockPrisma.category.findUnique).not.toHaveBeenCalled();
        });

        it('deve retornar a categoria quando o ID existe', async () => {
            mockPrisma.category.findUnique.mockResolvedValue(mockCategory as any);

            const result = await categoryService.getCategoryById(1);

            expect(mockPrisma.category.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockCategory);
        });

        it('deve retornar null se a categoria não for encontrada no banco', async () => {
            mockPrisma.category.findUnique.mockResolvedValue(null);

            const result = await categoryService.getCategoryById(999);

            expect(result).toBeNull();
        });

        it('deve lançar erro genérico em caso de falha no Prisma', async () => {
            mockPrisma.category.findUnique.mockRejectedValue(new Error('Prisma error'));

            await expect(categoryService.getCategoryById(1))
                .rejects
                .toThrow("Falha na operação de banco de dados.");
        });
    });

    describe('getCategoryByName', () => {
        it('deve retornar null se o nome não for fornecido', async () => {
            const result = await categoryService.getCategoryByName("");

            expect(result).toBeNull();
            expect(mockPrisma.category.findFirst).not.toHaveBeenCalled();
        });

        it('deve retornar a categoria ao buscar por nome', async () => {
            mockPrisma.category.findFirst.mockResolvedValue(mockCategory as any);

            const result = await categoryService.getCategoryByName('Eletrônicos');

            expect(mockPrisma.category.findFirst).toHaveBeenCalledWith({
                where: { name: 'Eletrônicos' }
            });
            expect(result).toEqual(mockCategory);
        });

        it('deve lançar erro genérico em caso de falha no Prisma', async () => {
            mockPrisma.category.findFirst.mockRejectedValue(new Error('Prisma error'));

            await expect(categoryService.getCategoryByName('Teste'))
                .rejects
                .toThrow("Falha na operação de banco de dados.");
        });
    });
});