import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { cartService } from '../src/services/cartService';
import { NotFoundError } from '../src/exceptions';

import { prisma } from '../src/lib/prisma'; 
    
jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

const mockCart = { id: 1, userId: 10, items: [] };
const mockProduct = { id: 100, name: 'Produto Teste', price: 50 };
const mockCartItem = { id: 500, cartId: 1, productId: 100, quantity: 1 };

describe('CartService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
describe('getCartByUserId', () => {
        it('deve retornar o carrinho existente se encontrado', async () => {
            mockPrisma.cart.findUnique.mockResolvedValue(mockCart as any);

            const result = await cartService.getCartByUserId(10);

            expect(mockPrisma.cart.findUnique).toHaveBeenCalledWith({
                where: { userId: 10 },
                include: expect.anything()
            });
            expect(mockPrisma.cart.create).not.toHaveBeenCalled();
            expect(result).toEqual(mockCart);
        });

        it('deve criar um novo carrinho se não encontrar um existente', async () => {
            mockPrisma.cart.findUnique.mockResolvedValue(null);
            mockPrisma.cart.create.mockResolvedValue(mockCart as any);

            const result = await cartService.getCartByUserId(10);

            expect(mockPrisma.cart.create).toHaveBeenCalledWith({
                data: { userId: 10 },
                include: { items: true }
            });
            expect(result).toEqual(mockCart);
        });
    });

    describe('getAllItemsByCart', () => {
        it('deve listar itens do carrinho', async () => {
            const mockItems = [mockCartItem];
            mockPrisma.cartItem.findMany.mockResolvedValue(mockItems as any);

            const result = await cartService.getAllItemsByCart(1);

            expect(mockPrisma.cartItem.findMany).toHaveBeenCalledWith({
                where: { cartId: 1 },
                include: { product: true }
            });
            expect(result).toEqual(mockItems);
        });
    });

    describe('addItemToCart', () => {
        it('deve lançar NotFoundError se o produto não existir', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(null);
            
            await expect(cartService.addItemToCart(10, 100, 1))
                .rejects
                .toThrow(NotFoundError);
                
            expect(mockPrisma.cartItem.create).not.toHaveBeenCalled();
        });

        it('deve lançar NotFoundError se o carrinho não existir', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(mockProduct as any);
            mockPrisma.cart.findUnique.mockResolvedValue(null);

            await expect(cartService.addItemToCart(10, 100, 1))
                .rejects
                .toThrow(NotFoundError); });

        it('deve criar novo item se não existir no carrinho', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(mockProduct as any);
            mockPrisma.cart.findUnique.mockResolvedValue(mockCart as any);
            mockPrisma.cartItem.findFirst.mockResolvedValue(null);
            mockPrisma.cartItem.create.mockResolvedValue(mockCartItem as any);

            const result = await cartService.addItemToCart(10, 100, 1);

            expect(mockPrisma.cartItem.create).toHaveBeenCalledWith({
                data: {
                    cartId: mockCart.id,
                    productId: mockProduct.id,
                    quantity: 1
                }
            });
            expect(result).toEqual(mockCartItem);
        });

        it('deve incrementar quantidade se item já existir', async () => {
            mockPrisma.product.findUnique.mockResolvedValue(mockProduct as any);
            mockPrisma.cart.findUnique.mockResolvedValue(mockCart as any);
            
            const existingItem = { ...mockCartItem, quantity: 1 };
            mockPrisma.cartItem.findFirst.mockResolvedValue(existingItem as any);

            const editSpy = jest.spyOn(cartService, 'editItemQuantity')
                .mockResolvedValue({ count: 1 } as any);

            await cartService.addItemToCart(10, 100, 2); 

            expect(editSpy).toHaveBeenCalledWith(mockCart.id, mockProduct.id, 3);
        });
    });

    describe('editItemQuantity', () => {
        it('deve deletar item se quantidade for 0', async () => {
            mockPrisma.cartItem.deleteMany.mockResolvedValue({ count: 1 });

            await cartService.editItemQuantity(1, 100, 0);

            expect(mockPrisma.cartItem.deleteMany).toHaveBeenCalledWith({
                where: { cartId: 1, productId: 100}
            });
        });

        it('deve atualizar item se quantidade > 0', async () => {
            mockPrisma.cartItem.updateMany.mockResolvedValue({ count: 1 });

            await cartService.editItemQuantity(1, 100, 5);

            expect(mockPrisma.cartItem.updateMany).toHaveBeenCalledWith({
                where: { cartId: 1, productId: 100 },
                data: { quantity: 5 },
            });
        });
        it('deve lançar NotFoundError se nenhum item for encontrado para atualização', async () => {
            // Simulando retorno do Prisma quando nada é encontrado
            mockPrisma.cartItem.updateMany.mockResolvedValue({ count: 0 });

            await expect(cartService.editItemQuantity(1, 100, 5))
                .rejects
                .toThrow(NotFoundError);
        });
    });

    describe('createCartForUser', () => {
        it('deve lançar erro se usuário não existe', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);

            await expect(cartService.createCartForUser(999))
                .rejects
                .toThrow("Usuário não encontrado");
        });

        it('deve criar carrinho para usuário existente', async () => {
            mockPrisma.user.findUnique.mockResolvedValue({ id: 10 } as any);
            mockPrisma.cart.create.mockResolvedValue(mockCart as any);

            const result = await cartService.createCartForUser(10);

            expect(result).toEqual(mockCart);
        });
    });
});