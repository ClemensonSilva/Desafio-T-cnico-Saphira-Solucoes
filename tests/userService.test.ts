import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { userService } from '../src/services/userService'; // Ajuste o caminho
import { prisma } from '../src/lib/prisma';
import { NotFoundError } from '@/exceptions';

jest.mock('../src/lib/prisma', () => ({
    __esModule: true,
    prisma: mockDeep<PrismaClient>(),
}));

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

const mockCartWithItems = { 
    id: 1, 
    userId: 10, 
    items: [], 
    createdAt: new Date(), 
    updatedAt: new Date() 
};

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCarByUser', () => {
        it('deve retornar o carrinho único do usuário incluindo os itens', async () => {
            mockPrisma.cart.findUnique.mockResolvedValue(mockCartWithItems as any);

            const result = await userService.getCarByUser(10);

            expect(mockPrisma.cart.findUnique).toHaveBeenCalledWith({
                where: { userId: 10 },
                        include: { items: true }, 
                    });
            expect(result).toEqual(mockCartWithItems);
        });

        it('deve lançar NotFoundError se o carrinho não for encontrado', async () => {
            mockPrisma.cart.findUnique.mockResolvedValue(null);

            await expect(userService.getCarByUser(10))
                .rejects
                .toThrow("Nenhum carrinho encontrado para o usuário fornecido");
        });
    });
});