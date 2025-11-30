import { NotFoundError } from "@/exceptions";
import { prisma } from "../lib/prisma";
import { categoryService } from "./categoryServices";

class ProductsService {
    async getProductById(productId: number) {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });
        return product;
    }
    // TODO : Adicionar paginação dos resultados
    async getAllProducts() {
        const products = await prisma.product.findMany({
            orderBy: { price: 'asc' }
        });

        if (products.length === 0) {
            throw new NotFoundError('Nenhum produto encontrado');
        }

        return products;

    }

    async deleteProductById(productId: number) {
        const deletedProduct = await prisma.product.delete({
            where: { id: productId },
        });
        return deletedProduct;
    }

    async getProductsByCategory(categoryId: number) {
        const products = await prisma.product.findMany({
            where: { categoryId: categoryId },
            orderBy: { price: 'asc' },
            include: { category: true },
        });
        return products;
    }

    async getProductsByName(productName: string) {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: productName,
                    mode: 'insensitive',
                },
            },
            orderBy: { price: 'asc' },
            include: { category: true },
        });
        return products;
    }
async getProductsByFilter(categoryName?: string, searchQuery?: string) {
    
    if (!categoryName && !searchQuery) {
        return this.getAllProducts();
    }
    
    const filters: any[] = [];
    let categoryId: number | undefined;

    if (categoryName) {
        const category = await categoryService.getCategoryByName(categoryName);
        if (!category) {
            throw new NotFoundError('Categoria não encontrada');
        }
        categoryId = category.id;
        filters.push({ categoryId: categoryId });
    }

    if (searchQuery) {
        filters.push({ name: { contains: searchQuery, mode: 'insensitive' } });
    }

    const products = await prisma.product.findMany({
        where: {
            AND: filters,
        },
        orderBy: { price: 'asc' },
        include: { category: true },
    });
    if (products.length === 0) {
        throw new NotFoundError('Nenhum produto encontrado com os filtros fornecidos');
    }
    
    return products;
}    
}

export const productsService = new ProductsService();