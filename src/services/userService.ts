import { NotFoundError } from "@/exceptions";
import { prisma } from "../lib/prisma";

class UserService {
 async  getCarByUser(userId: number){
    const carts = await prisma.cart.findUnique({
        where: { userId: userId },
        include: { items: true },
    });
    if (!carts) {
        throw new NotFoundError('Nenhum carrinho encontrado para o usuário fornecido');
    }
    return carts;
}
    
} 

export const userService = new UserService();