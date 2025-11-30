"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type SearchBarProps = {
   categoryName: string | undefined;
}


export function SearchBar() {
  const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
  async function handleSearch(query: string) {
    const {replace} = router;
    const categoryName = searchParams.get('category') || undefined;
    
    const params = new URLSearchParams(searchParams);
    if (query) {
        params.set("search", query);
    } else {
        params.delete("search");
    }

    if (categoryName) {
        params.set("category", categoryName);
    }
    
    replace(`${pathname}?${params.toString()}`);

  console.log("Searching for:", query);  
}
  return (
    <div className="flex gap-2">
      <Input 
        type="text" 
        placeholder="Buscar produtos..." 
        onChange={(e) => handleSearch(e.target.value)}
      />
    
    </div>
  );
}   