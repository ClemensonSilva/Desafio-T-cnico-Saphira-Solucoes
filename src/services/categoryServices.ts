import { NotFoundError } from "@/exceptions";
import {prisma } from "../lib/prisma";

class CategoryService {
    async getAllCategories() {
            const categories = await prisma.category.findMany({
                orderBy: { name: 'asc' }
            });

            if(categories.length === 0) { throw new NotFoundError("Nenhuma categoria encontrada"); }

            return categories;
    }

    async getCategoryById(categoryId: number) { 

            const category = await prisma.category.findUnique({
                where: { id: categoryId },
            });

            if(!category) { throw new NotFoundError("Categoria não encontrada"); }
            return category;
    }

    async getCategoryByName(name: string) {
        
        const category = await prisma.category.findFirst({
            where: { name: name },
        });
        
        if(!category) { throw new NotFoundError("Categoria não encontrada"); }

        return category; 

        
    
}
}
export const categoryService = new CategoryService();