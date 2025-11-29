"use client"; // 👈 OBRIGATÓRIO PARA USAR O onClick E useRouter

import Link from "next/link";
import { ShoppingCart, Store, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Para simular estado de login

export function Header() {
  const router = useRouter();
  
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  
  const cartItemCount = 2; 

  async function handleLogout() {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      setIsLoggedIn(false); 
      
      router.refresh(); 
      router.push("/login"); 
    } else {
      console.error("Falha ao fazer logout.", res.statusText, res.body);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/products" className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Store className="h-6 w-6" />
          <span>Tem de Tudo</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            href="/products" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden sm:block"
          >
            Produtos
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-gray-700">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center px-1">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              size="sm" 
              className="text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}