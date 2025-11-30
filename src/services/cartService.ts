import { prisma } from '../lib/prisma'; 

class CartService {

    async getAllItemsByCart(cartId: number) {
        const items = await prisma.cartItem.findMany({
            where: { cartId: cartId },
            include: {
                product: true
            }
        });
        return items;
    }

    async getCartByUserId(userId: number) {
        let cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: true
                            }
                        }
                    }
                }
            }
        });
        // se for primeiro acesso, cria o carrinho
        if (!cart) {
            return await prisma.cart.create({
                data: { userId: userId },
                include: { items: true }
            });
        }
        return cart;
    }

    async addItemToCart(userId: number, productId: number, quantity: number) {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });
        // pega o carrinho do usuario
        const cart = await prisma.cart.findUnique({
            where: { userId: userId },
        });

        if (!product || !cart) {
            return null;
        }
        // se o item já existe, atualiza a quantidade
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            this.editItemQuantity(cart.id, productId, existingItem.quantity);
            return existingItem;
        }

        const cartId = cart.id;

        const newItem = await prisma.cartItem.create({
            data: {
                cartId: cartId,
                productId: productId,
                quantity,
            },
        });
        return newItem;
    }

    async editItemQuantity(cartId: number, productId: number, quantity: number) {
        if (quantity === 0) {
            return await prisma.cartItem.deleteMany({
                where: { cartId:cartId, productId: productId }
            });
        }

        const updatedItem = await prisma.cartItem.updateMany({
            where: { cartId: cartId, productId: productId },
            data: { quantity: quantity },
        });
        return updatedItem;
    }
    
    async removeItemFromCart(cartId: number) {
        const deletedItem = await prisma.cartItem.deleteMany({
            where: { cartId: cartId },
        });
        return deletedItem;
    }
    async createCartForUser(userId: number) {

        const userExists = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        const newCart = await prisma.cart.create({
            data: { userId: userId },
            include: { items: true }
        });

        return newCart;
    }

    // Não faz sentido um e-commercer permitir uma funcionalidade como essa
    async clearCart(cartId: number) {
        const deletedItems = await prisma.cartItem.deleteMany({
            where: { cartId: cartId },
        });
        return deletedItems;
    }
}

export const cartService = new CartService();