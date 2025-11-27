import { ProductCard } from "./products-card";
import { ProductUI } from "@/types/index";

interface ProductGridProps {
  products:    ProductUI[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    const mockedProducts = [
      {
        id: 1,
        name: "Mock Product 1",
        price: "19.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        categoryId: 1,
        description: "Descrição do produto mock 1",
      },
      {
        id: 2,
        name: "Mock Product 2",
        price: "29.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        categoryId: 2,
        description: "Descrição do produto mock 2",
      },
      {
        id: 3,
        name: "Mock Product 3",
        price: "39.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        categoryId: 3,
        description: "Descrição do produto mock 3",
      },
      {
        id: 4,
        name: "Mock Product 4",
        price: "49.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        categoryId: 4,
        description: "Descrição do produto mock 4",
      },
      {
        id: 5,
        name: "Mock Product 5",
        price: "59.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0MjExNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",  
        categoryId: 5,
        description: "Descrição do produto mock 5",
      },
    ] as ProductUI[];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}