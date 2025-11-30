import { GET } from '@/app/api/products/route'; 
import {DELETE} from '@/app/api/products/[id]/routes';
import { NextRequest } from 'next/server';
import { categoryService } from '../src/services/categoryServices';
import { productsService } from '../src/services/productsService';

jest.mock('../src/services/categoryServices');
jest.mock('../src/services/productsService');

const mockCategoryService = categoryService as jest.Mocked<typeof categoryService>;
const mockProductsService = productsService as jest.Mocked<typeof productsService>;

describe('API Route: /api/products', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET', () => {
        
       

        it('deve retornar 404 se a categoria não for encontrada', async () => {
            const req = new NextRequest('http://localhost:3000/api/products?category=inexistente');
            
            mockCategoryService.getCategoryByName.mockResolvedValue(null);

            const response = await GET(req);
            const json = await response.json();

            expect(response.status).toBe(404);
            expect(json).toEqual({ error: "Categoria não encontrada" });
            expect(mockCategoryService.getCategoryByName).toHaveBeenCalledWith('inexistente');
        });

        it('deve retornar 404 se não houver produtos naquela categoria', async () => {
            const req = new NextRequest('http://localhost:3000/api/products?category=vazia');
            
            mockCategoryService.getCategoryByName.mockResolvedValue({ id: 1, name: 'vazia' } as any);
            mockProductsService.getProductsByCategory.mockResolvedValue([]);

            const response = await GET(req);
            const json = await response.json();

            expect(response.status).toBe(404);
            expect(json).toEqual({ error: "Nenhum produto encontrado para esta categoria" });
        });

        it('deve retornar 200 e a lista de produtos em caso de sucesso', async () => {
            const req = new NextRequest('http://localhost:3000/api/products?category=tech');
            const mockProducts = [{ id: 10, name: 'Mouse' }];

            mockCategoryService.getCategoryByName.mockResolvedValue({ id: 5, name: 'tech' } as any);
            mockProductsService.getProductsByCategory.mockResolvedValue(mockProducts as any);

            const response = await GET(req);
            const json = await response.json();

            expect(response.status).toBe(200);
            expect(json).toEqual(mockProducts);
            expect(mockProductsService.getProductsByCategory).toHaveBeenCalledWith(5);
        });
    });

    describe('DELETE', () => {
        
        it('deve retornar 404 se o produto não for encontrado ou erro ao deletar', async () => {
            const req = new NextRequest('http://localhost:3000/api/products/999', { method: 'DELETE' });
            
            mockProductsService.deleteProductById.mockResolvedValue(null as any);

            const params = Promise.resolve({ id: '999' });

            const response = await DELETE(req, { params });
            const json = await response.json();

            expect(response.status).toBe(404);
            expect(json).toEqual({ error: "Produto não encontrado ou erro ao deletar" });
        });

        it('deve retornar 200 e o produto deletado em caso de sucesso', async () => {
            const req = new NextRequest('http://localhost:3000/api/products/50', { method: 'DELETE' });
            const deletedItem = { id: 50, name: 'Item Deletado' };

            mockProductsService.deleteProductById.mockResolvedValue(deletedItem as any);

            const params = Promise.resolve({ id: '50' });

            const response = await DELETE(req, { params });
            const json = await response.json();

            expect(response.status).toBe(200);
            expect(json).toEqual(deletedItem);
            expect(mockProductsService.deleteProductById).toHaveBeenCalledWith(50);
        });
    });
});