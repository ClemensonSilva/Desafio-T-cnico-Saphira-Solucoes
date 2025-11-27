import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const cartItemCount = 2; // Número fixo apenas para testar o visual

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/products" className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Store className="h-6 w-6" />
          <span>TechStore</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            href="/products" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden sm:block"
          >
            Products
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-gray-700">
              <ShoppingCart className="h-5 w-5" />
              
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center px-1"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}