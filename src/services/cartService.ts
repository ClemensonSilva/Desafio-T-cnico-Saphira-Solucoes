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