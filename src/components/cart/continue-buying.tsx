import { ArrowRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

import { RecommendedProducts } from "@/components/ui/recommended-products";
import { Product } from "@prisma/client"; // Seu tipo do Prisma
import { ProductUI } from "@/types";

interface ContinueBuyingProps {
  categoryName: string;
  products: ProductUI[]; 
}

export function ContinueBuying({ categoryName, products }: ContinueBuyingProps) {
  return (
    <section className="mt-12 w-full space-y-6">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Recomendações</h2>
          <p className="text-gray-500">Mais produtos de {categoryName}</p>
        </div>
        
        <Link href={`/products?category=${categoryName}`} className="hidden sm:flex rounded-full">
          Ver todos {categoryName} 
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <RecommendedProducts 
          key={product.id}
          product={product} />
        ))}
      </div>
    </section>
  );
}