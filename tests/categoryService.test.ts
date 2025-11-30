import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { categoryService } from '../src/services/categoryServices'; // Ajuste o caminho se necessário
import { prisma } from '../src/lib/prisma';
import { NotFoundError } from '@/exceptions';

jest.mock('../src/lib/prisma', () => ({
    __esModule: true,
    prisma: mockDeep<PrismaClient>(),
}));

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

const mockCategory = { id: 1, name: 'Eletrônicos', image: 'url.jpg' };

describe('CategoryService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCategories', () => {
        it('deve retornar a lista de categorias se houver registros', async () => {
            const mockList = [mockCategory, { id: 2, name: 'Livros' }];
            mockPrisma.category.findMany.mockResolvedValue(mockList as any);

            const result = await categoryService.getAllCategories();

            expect(mockPrisma.category.findMany).toHaveBeenCalledWith({
                orderBy: { name: 'asc' }
            });
            expect(result).toEqual(mockList);
        });

        it('deve lançar NotFoundError se a lista estiver vazia', async () => {
            mockPrisma.category.findMany.mockResolvedValue([]);

            await expect(categoryService.getAllCategories())
                .rejects
                .toThrow(NotFoundError);
                // ou .toThrow("Nenhuma categoria encontrada")
        });
    });

    describe('getCategoryById', () => {
        it('deve retornar a categoria se o ID existir', async () => {
            mockPrisma.category.findUnique.mockResolvedValue(mockCategory as any);

            const result = await categoryService.getCategoryById(1);

            expect(mockPrisma.category.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockCategory);
        });

        it('deve lançar NotFoundError se o ID não for encontrado', async () => {
            mockPrisma.category.findUnique.mockResolvedValue(null);

            await expect(categoryService.getCategoryById(999))
                .rejects
                .toThrow(NotFoundError);
        });
    });

    describe('getCategoryByName', () => {
        it('deve retornar a categoria se o nome existir', async () => {
            mockPrisma.category.findFirst.mockResolvedValue(mockCategory as any);

            const result = await categoryService.getCategoryByName('Eletrônicos');

            expect(mockPrisma.category.findFirst).toHaveBeenCalledWith({
                where: { name: 'Eletrônicos' }
            });
            expect(result).toEqual(mockCategory);
        });

        it('deve lançar NotFoundError se o nome não for encontrado', async () => {
            mockPrisma.category.findFirst.mockResolvedValue(null);

            await expect(categoryService.getCategoryByName('Inexistente'))
                .rejects
                .toThrow(NotFoundError);
        });
    });
});