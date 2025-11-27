// src/components/ui/card.tsx
import React from "react";

interface CardDivProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function Card({ className = "", ...props }: CardDivProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardDivProps) {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = "", ...props }: CardHeadingProps) {
  return (
    <h3
      className={`font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: CardDivProps) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props} />
  );
}

export function CardFooter({ className = "", ...props }: CardDivProps) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  );
}


