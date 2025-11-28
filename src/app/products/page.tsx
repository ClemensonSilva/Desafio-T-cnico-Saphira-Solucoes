import { Header } from "@/components/layouts/header";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/product-grid";
import { SearchBar } from "@/components/products/search-bar";
import { ProductUI } from "@/types";
import Image from "next/image"; 

async function getCategories() {
  const data = await fetch('http://localhost:3000/api/categories', {
      cache: 'no-store' 
  });
  
  
  return data.json();
}

async function getProducts(categoryName?: string) {
  const url = categoryName 
    ? `http://localhost:3000/api/products?category=${encodeURIComponent(categoryName)}`
    : 'http://localhost:3000/api/products';
  
  const data = await fetch(url, {
    cache: 'no-store' 
  });

  if (!data.ok) {
    return [];
  }
  return data.json();
}

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Products(props: ProductsPageProps) { 
      const searchParams = await props.searchParams;
      const [products, categories] = await Promise.all([
        getProducts(searchParams.category as string | undefined),
        getCategories()
      ]);


      
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shop Our Products
          </h1>
          <p className="text-gray-500 text-lg">
            Discover our amazing collection of tech products
          </p>
        </div>

        <div className="w-full">
          <SearchBar />
        </div>
      
        <div>
          <CategoryFilter categories={categories} />
        </div>

        <ProductGrid products={products} />
      </main>
    </div>
  );
}