#  Simple E-commerce Next.js

Um e-commerce simples desenvolvido com **Next.js (App Router)**, **Prisma ORM** e **PostgreSQL**.  
Permite visualizar produtos, adicionar itens ao carrinho e ver o resumo da compra.

---

##  Tecnologias Utilizadas

- **Frontend:** Next.js 14+, React, Tailwind CSS (opcional)
- **Backend:** Next.js API Routes
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Gerenciador de Pacotes:** npm ou yarn

---

###  Descrição da Arquitetura

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

##  Pré-requisitos

- Node.js 18+
- Git
- PostgreSQL

---

##  Configuração e Instalação

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

##  API Endpoints

GET /api/products → Lista produtos  
GET /api/cart → Retorna carrinho  
POST /api/cart → Adiciona item  
DELETE /api/cart/:id → Remove item  

---

##  Schema (Prisma)

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  cep       String?
  cart      Cart?
  @@map("users")
}

model Product {
  id          Int        @id @default(autoincrement())
  name        String
  price       Decimal    @db.Decimal(10, 2)
  description String     @db.VarChar(255)
  categoryId  Int
  category    Category   @relation(fields: [categoryId], references: [id])
  imageUrl    String     @map("image_url")
  cartItems   CartItem[]
  @@map("products")
}

model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  products  Product[]
  @@map("categories")
}

model Cart {
  id        Int      @id @default(autoincrement())
  userId    Int      @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  items     CartItem[]
  user      User     @relation(fields: [userId], references: [id])
  @@map("carts")
}

model CartItem {
  id        Int      @id @default(autoincrement())
  cartId    Int      @map("cart_id")
  cart      Cart     @relation(fields: [cartId], references: [id])
  productId Int      @map("product_id")
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int      @default(1)
  @@map("cart_items")
}

---

##  Deploy na Vercel

Repositório possui deploy na vercel no seguinte link [text](https://desafio-t-cnico-saphira-solucoes-ae.vercel.app/)

O sistema precisa de um login simples para funcionar. Alguns usuários para teste foram criados:

User {
  [{

  email: alice@example.com,
  senha: senha123
  },
  {
  email: carla@example.com,
  senha: senha123
  }
]
}


---

## 📝 Licença

MIT
