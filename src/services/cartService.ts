import { prisma } from "../lib/prisma";

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
                    include: { category: true   
                    }
                }
            }
        }
    }});
    // se for primeiro acesso, cria o carrinho
    if (!cart) {
        return  await prisma.cart.create({
            data: { userId: userId },
            include: { items: true } 
        });
    }
    return cart;
}

 async addItemToCart(cartId: number, productId: number, quantity: number) {
    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

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
            where: { cartId, productId }
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
    // Não faz sentido um e-commercer permitir uma funcionalidade como essa
 async clearCart(cartId: number) {
    const deletedItems = await prisma.cartItem.deleteMany({
        where: { cartId: cartId },
    });
    return deletedItems;
}
}

export const cartService = new CartService();