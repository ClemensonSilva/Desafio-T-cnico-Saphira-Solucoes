"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { ProductUI } from "@/types/index";

import Image from "next/image"; // futura otimizacao



async function addToCart(productId: number) {

  const response = await fetch('/api/cart', {

    method: 'POST',

    headers: {

      Cookie: cookieStore.toString()

    },

    body: JSON.stringify({ productId, quantity: 1 }),

  });



  if (!response.ok) {

    throw new Error('Erro ao adicionar ao carrinho');

  }



  return response.json();

}



export function ProductCard({ product }: { product: ProductUI }) {



  const formattedPrice = new Intl.NumberFormat('pt-BR', {

    style: 'currency',

    currency: 'BRL',

  }).format(Number(product.price));



  return (

    <Card className="max-w-[300px] overflow-hidden">

      <div className="h-48 bg-gray-100 flex items-center justify-center">

        <img src={product.imageUrl} alt={product.name} className="object-cover h-full w-full" />

      </div>



      <CardHeader>

        <CardTitle>{product.name}</CardTitle>

        <p className="text-sm text-gray-500">{product.category?.name}</p>

      </CardHeader>



      <CardContent>

        <p className="text-gray-600 text-sm">

          {product.description}

        </p>

      </CardContent>



      <CardFooter className="flex justify-between">

        <span className="text-lg font-bold">{formattedPrice}</span>

        <Button size="sm" onClick={() => addToCart(product.id)}>Add to Cart</Button>

      </CardFooter>

    </Card>

  );

}
