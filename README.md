# 🛒 Simple E-commerce Next.js

Um e-commerce simples desenvolvido com **Next.js (App Router)**, **Prisma ORM** e **PostgreSQL**.  
Permite visualizar produtos, adicionar itens ao carrinho e ver o resumo da compra.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** Next.js 14+, React, Tailwind CSS (opcional)
- **Backend:** Next.js API Routes
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Gerenciador de Pacotes:** npm ou yarn

---

## 🏗️ Arquitetura do Projeto

A estrutura geral do projeto:

.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/
│   │   └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   └── api/
│       ├── products/
│       │   └── route.ts
│       └── cart/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── components/
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   └── Header.tsx
│
├── lib/
│   ├── prisma.ts
│   └── utils.ts
│
├── public/
│   └── imagens_de_produtos.png
│
├── .env
├── package.json
├── tsconfig.json
└── README.md

### 🔍 Descrição da Arquitetura

Front-end (app/):  
- App Router  
- Server Components  
- Consumo das APIs internas  

API (app/api/):  
- Rotas REST  
- Prisma para CRUD  
- Respostas JSON  

Banco (prisma/):  
- Models: User, Category, Product, Cart, CartItem  

Componentes (components/):  
- Componentes reutilizáveis  
- Tailwind opcional  

---

## 📋 Pré-requisitos

- Node.js 18+
- Git
- PostgreSQL

---

## 🔧 Configuração e Instalação

### 1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

### 2. Instalar dependências
npm install  
ou  
yarn install

### 3. Arquivo .env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

### 4. Criar tabelas
npx prisma migrate dev --name init

### 5. Popular o banco
npx prisma db seed  
ou  
npx prisma studio

### 6. Iniciar o servidor
npm run dev  
http://localhost:3000

---

## 📡 API Endpoints

GET /api/products → Lista produtos  
GET /api/cart → Retorna carrinho  
POST /api/cart → Adiciona item  
DELETE /api/cart/:id → Remove item  

---


## Modelagem de entidades com Prisma ORM
➡️ Arquivo completo do schema:  

https://github.com/ClemensonSilva/Desafio-T-cnico-Saphira-Solucoes/blob/main/prisma/schema.prisma

---

## 🚀 Deploy na Vercel

Repositório possui deploy na vercel no seguinte link [text](https://desafio-t-cnico-saphira-solucoes-ae.vercel.app/)

O sistema precisa de um login simples para funcionar. Alguns usuários para teste foram criados com os emaisl de acesso e senha dada a seguir: 

  email: alice@example.com,
  email: carla@example.com,
  senha: senha123
 


---

## 📝 Licença

MIT
