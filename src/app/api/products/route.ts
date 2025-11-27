import { productsService } from '@/services/productsService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    let products ; 

    if (categoryId) {
        products = await productsService.getProductsByCategory(Number(categoryId));
    }

    if(!categoryId){ {
        products = await productsService.getAllProducts();
    }


    if (!products) {
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
}