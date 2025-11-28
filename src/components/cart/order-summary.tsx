"use client";
import React from 'react';
import { Button } from "@/components/ui/button"; // Supondo que você tenha shadcn/ui ou similar
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface OrderSummaryProps {
  subtotal: number;
  taxRate?: number; // Opcional, default 0.1 (10%)
 
}
async function onCheckout() {
  // Lógica de checkout aqui
  console.log("Checkout click");
}

async function onContinueShopping() {
  // Lógica para continuar comprando aqui
  console.log("Continue click");
}


export function OrderSummary({ 
  subtotal, 
  taxRate = 0.1, 
}: OrderSummaryProps) {
  
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-sm border border-gray-100 rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-gray-900">
          Resumo do Pedido
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between items-center text-gray-600">
          <span>Tax ({taxRate * 100}%)</span>
          <span className="font-medium text-gray-900">{formatCurrency(taxAmount)}</span>
        </div>

        <div className="border-t border-gray-100 my-4"></div>

        <div className="flex justify-between items-center text-xl font-semibold text-gray-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-2">
        <Button 
          className="w-full bg-slate-950 hover:bg-slate-800 text-white rounded-lg h-12 text-base"
          onClick={onCheckout}
        >
          Finalizar Compra
        </Button>

        <Link
          href="/products"
          onClick={() => onContinueShopping()}
          className="w-full inline-flex items-center justify-center border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg h-12 text-base"
        >
          Continuar Comprando
        </Link>
      </CardFooter>
    </Card>
  );
}