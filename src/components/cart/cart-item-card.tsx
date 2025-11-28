"use client";

import { Trash2, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { CartItemUI } from "@/types/index";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CartItemUIProps {
  item: CartItemUI;
}

function onUpdateQuantity(newQty: number) {

  console.log("Update quantity to:", newQty);
}
function onRemove() {
  console.log("Remove item from cart");
}



export function CartItemCard({ item }: CartItemUIProps) {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false); 

  const priceFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(item.product.price) * item.quantity);

  async function handleUpdateQuantity(newQty: number) {
    if (newQty < 1) return; 
    
    setIsLoading(true);

    try {
      const response = await fetch(`/api/cart/${item.cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: item.cartId,
          productId: item.product.id, 
          quantity: newQty,
        }),
      });

      if (!response.ok) {
        console.error("Erro ao atualizar item");
      } else {
        router.refresh(); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  async function handleRemove() {
    setIsLoading(true);
    try {
      
      const response = await fetch(`/api/cart/${item.cartId}`, {
        method: "PUT",
        body: JSON.stringify({
          cartId: item.cartId,
          productId: item.product.id,
          quantity: 0,
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

 return (
    <Card className="flex flex-row items-center gap-4 p-4 shadow-sm border-gray-100">
      
      {/* Imagem */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.product.imageUrl || "/placeholder.png"}
          alt={item.product.name}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col justify-between h-full">
        
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">
              {item.product.name}
            </CardTitle>
            <p className="text-sm text-gray-500 font-medium">
              {item.product.category?.name || "Sem Categoria"}
            </p>
          </div>

          <Button 
            onClick={() => handleRemove()}
            disabled={isLoading}
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-red-600 transition-colors -mr-2 -mt-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-end justify-between mt-4">
          
          <div className="flex items-center border border-gray-200 rounded-md h-9">
            <Button
              variant="ghost"
              size="icon"
              className="h-full w-9 rounded-none text-gray-500 hover:text-gray-900"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1 || isLoading}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm font-medium text-gray-900">
              {item.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-full w-9 rounded-none text-gray-500 hover:text-gray-900"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={isLoading}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="font-bold text-xl text-gray-900">
            {priceFormatted}
          </div>
        </div>
      </div>
    </Card>
  );
}