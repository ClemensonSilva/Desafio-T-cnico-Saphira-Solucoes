"use client";

import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { CartItemUI } from "@/types/index";

interface CartItemUIProps {
  item: CartItemUI;
}

// Funções mockadas para exemplo (idealmente viriam via props ou context)
function onUpdateQuantity(newQty: number) {
  console.log("Update quantity to:", newQty);
}
function onRemove() {
  console.log("Remove item from cart");
}

export function CartItemCard({ item }: CartItemUIProps) {
  const priceFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(item.product.price) * item.quantity);

  return (
    <Card className="flex flex-row items-center gap-4 p-4 shadow-sm border-gray-100">
      
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.product.imageUrl || "/placeholder.png"}
          alt={item.product.name}
          className="object-cover h-full w-full"
        />
      </div>

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
            onClick={onRemove}
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-red-600 transition-colors -mr-2 -mt-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-end justify-between mt-4">
          
          <div className="flex items-center border border-gray-200 rounded-md h-9">
            <Button
              variant="ghost"
              size="icon"
              className="h-full w-9 rounded-none text-gray-500 hover:text-gray-900"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
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
              onClick={() => onUpdateQuantity(item.quantity + 1)}
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