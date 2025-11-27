import { ProductCard } from "./products-card";
import { ProductUI } from "@/types/index";

interface ProductGridProps {
  products:    ProductUI[];
}

export function ProductGrid({ products }: ProductGridProps) {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}