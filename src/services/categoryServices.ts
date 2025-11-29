import {prisma } from "@/lib/prisma";

class CategoryService {
    async getAllCategories() {
        try {
            const categories = await prisma.category.findMany({
                orderBy: { name: 'asc' }
            });
            return categories;
        } catch (error) {
            console.error("Erro ao buscar todas as categorias:", error);
            throw new Error("Falha na operação de banco de dados.");
        }
    }

    async getCategoryById(categoryId: number) { 
        if (!categoryId) return null;

        try {
            const category = await prisma.category.findUnique({
                where: { id: categoryId },
            });
            return category;
        } catch (error) {
            console.error("Erro ao buscar categoria por ID:", error);
            throw new Error("Falha na operação de banco de dados.");
        }
    }

    async getCategoryByName(name: string) {
        if (!name) return null;
        
        try {
        const category = await prisma.category.findFirst({
            where: { name: name },
        });
        
        return category; 

        } catch (error) {
             console.error("Erro ao buscar categoria por nome:", error);
            throw new Error("Falha na operação de banco de dados."); 
        
    }
}
}
export const categoryService = new CategoryService();