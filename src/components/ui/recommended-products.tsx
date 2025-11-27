import { ProductCard } from "@/components/products/products-card";
import { ProductUI } from "@/types";

interface RecommendedProductsProps {
  
  product : ProductUI;
}

export function RecommendedProducts( {product} : RecommendedProductsProps) {
  return (
      <ProductCard product={ product} />
  );
}