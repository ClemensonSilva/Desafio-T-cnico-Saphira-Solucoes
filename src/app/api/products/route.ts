import { categoryService } from '@/services/categoryServices';
import { productsService } from '@/services/productsService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get('category'); 
   let products ; 
    
   if(!categoryName){ 
        products = await productsService.getAllProducts();
    }
   
    if (categoryName) {
        const category = await categoryService.getCategoryByName(categoryName);
        if (!category ) {
            return new Response(JSON.stringify({ error: 'Categoria não encontrada' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        products = await productsService.getProductsByCategory(category.id);
    }

   


    if (!products || products.length === 0) {
        return new Response(JSON.stringify({ error: 'Produtos não encontrados' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
