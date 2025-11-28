"use client" 

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CategoryUI } from "@/types"; // Assumindo que você criou os tipos

interface CategoryFilterProps {
  categories: CategoryUI[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get('category') || 'All Categories';
  
  const handleSelectCategory = (categoryName: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryName) {
      params.set("category", categoryName);
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 pb-4">
      <Button
        variant={activeCategory === 'All Categories' ? "default" : "outline"}
        onClick={() => handleSelectCategory(null)}
        size="sm"
        className="rounded-full"
      >
        All Categories
      </Button>

      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.name ? "default" : "outline"}
          onClick={() => handleSelectCategory(cat.name)}
          size="sm"
          className="rounded-full"
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}