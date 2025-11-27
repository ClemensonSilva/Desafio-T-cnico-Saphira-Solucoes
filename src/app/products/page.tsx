import { Header } from "@/components/layouts/header";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/produxts-grid";
import { SearchBar } from "@/components/products/search-bar";
// Image não está sendo usado diretamente aqui, mas mantive o import caso precise depois
import Image from "next/image"; 

export default function HomePage() { // Mudei o nome para HomePage pois esse design é da Home
  return (
    // 1. Fundo cinza claro para toda a página (igual à imagem)
    <div className="min-h-screen bg-gray-50">
      
      {/* Header fica fora do container principal para ocupar 100% da largura */}
      <Header />

      {/* 2. Container Centralizado com margens */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Bloco de Título e Subtítulo */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shop Our Products
          </h1>
          <p className="text-gray-500 text-lg">
            Discover our amazing collection of tech products
          </p>
        </div>

        {/* Barra de Busca (Ocupando largura total ou limitada se preferir) */}
        <div className="w-full">
          <SearchBar />
        </div>
      
        {/* Filtros de Categoria */}
        <div>
          <CategoryFilter categories={[
            { id: 1, name: "Electronics" }, // Ajustei os nomes para bater com a imagem (Audio, Computers...)
            { id: 2, name: "Audio" },
            { id: 3, name: "Computers" },
            { id: 4, name: "Wearables" },
            { id: 5, name: "Photography" },
            { id: 6, name: "Mobile" },
          ]} />
        </div>

        {/* Grid de Produtos */}
        <ProductGrid products={[]} />
      </main>
    </div>
  );
}