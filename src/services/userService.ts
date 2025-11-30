import { prisma } from "../lib/prisma";

class UserService {
 async  getCarByUser(userId: number){
    const carts = await prisma.cart.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' }
    });
    return carts;
}
    
}

export const userService = new UserService();