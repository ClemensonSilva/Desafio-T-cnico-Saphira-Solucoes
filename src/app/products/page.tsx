import { Header } from "@/components/layouts/header";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/product-grid";
import { SearchBar } from "@/components/products/search-bar";
import { ProductUI } from "@/types";
import Image from "next/image"; 




export default function Products() { // Mudei o nome para HomePage pois esse design é da Home

      const  mockedProducts =  [
        {
          id: 1,
          name: "Mock Product 1",
          price: 19.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          categoryId: 1,
          description: "Descrição do produto mock 1",
        },
        {
          id: 2,
          name: "Mock Product 2",
          price: 29.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          categoryId: 2,
          description: "Descrição do produto mock 2",
        },
        {
          id: 3,
          name: "Mock Product 3",
          price: 39.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          categoryId: 3,
          description: "Descrição do produto mock 3",
        },
        {
          id: 4,
          name: "Mock Product 4",
          price: 49.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          categoryId: 4,
          description: "Descrição do produto mock 4",
        },
        {
          id: 5,
          name: "Mock Product 5",
          price: 59.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",  
          categoryId: 5,
          description: "Descrição do produto mock 5",
        },
      ] as ProductUI[];
  
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
          <CategoryFilter categories={[
            { id: 1, name: "Electronics" },
            { id: 2, name: "Audio" },
            { id: 3, name: "Computers" },
            { id: 4, name: "Wearables" },
            { id: 5, name: "Photography" },
            { id: 6, name: "Mobile" },
          ]} />
        </div>

        <ProductGrid products={mockedProducts} />
      </main>
    </div>
  );
}