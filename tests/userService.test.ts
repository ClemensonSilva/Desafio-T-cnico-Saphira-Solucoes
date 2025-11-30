import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { userService } from '../src/services/userService'; // Ajuste o caminho

import {prisma} from '../src/lib/prisma';
import { mockReset } from 'jest-mock-extended';

const mockPrisma = mockDeep<PrismaClient>();

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCarByUser', () => {
        const userId = 1;
        const mockCarts = [
            { id: 2, userId: 1, createdAt: new Date('2023-10-02') }, 
            { id: 1, userId: 1, createdAt: new Date('2023-10-01') }, 
        ];

        

        it('deve retornar um array vazio se o usuário não tiver carrinhos', async () => {
            mockPrisma.cart.findMany.mockResolvedValue([]);

            const result = await userService.getCarByUser(userId);

            expect(mockPrisma.cart.findMany).toHaveBeenCalledWith({
                where: { userId: userId },
                orderBy: { createdAt: 'desc' }
            });
            expect(result).toEqual([]);
        });
        
        it('deve propagar o erro se a consulta ao banco falhar', async () => {
            const prismaError = new Error("Database connection error");
            mockPrisma.cart.findMany.mockRejectedValue(prismaError);

            await expect(userService.getCarByUser(userId)).rejects.toThrow(prismaError);
        });
    });
});