import {prisma } from "@/lib/prisma";

class ProductsService {
 async  getProductById(productId: number) {
   const product = await prisma.product.findUnique({
       where: { id: productId },
   });
   return product;
}
// TODO : Adicionar paginação dos resultados
 async  getAllProducts() {
    const products = await prisma.product.findMany({
        orderBy: { price: 'asc' }
    });
    return products;
    
}

 async  searchProductsByName(name: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            },
        },
    });
    return products;
}

async deleteProductById(productId: number) {
    const deletedProduct = await prisma.product.delete({
        where: { id: productId },
    });
    return deletedProduct;
}

 async  getProductsByCategory(categoryId: number) {
    const products = await prisma.product.findMany({
        where: { categoryId: categoryId },
        orderBy: { price: 'asc' }
    });
    return products;
}
}

 export const productsService = new ProductsService();