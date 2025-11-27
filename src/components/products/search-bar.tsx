"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export function SearchBar() {
  return (
    <div className="flex gap-2">
      <Input 
        type="text" 
        placeholder="Buscar produtos..." 
        onChange={(e) => console.log(e.target.value)}
      />
    
    </div>
  );
}   