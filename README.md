🛒 Simple E-commerce Next.js

Este é um projeto de uma aplicação web simples de e-commerce desenvolvida com Next.js (App Router) e PostgreSQL. O objetivo é permitir que usuários visualizem produtos, adicionem itens ao carrinho e vejam o resumo da compra.

O projeto utiliza Prisma ORM para gerenciamento do banco de dados e segue uma arquitetura baseada em API Routes do Next.js.

🚀 Tecnologias Utilizadas

Frontend: Next.js 14+ (App Router), React, Tailwind CSS (opcional, mas recomendado).

Backend: Next.js API Routes.

Banco de Dados: PostgreSQL.

ORM: Prisma.

Gerenciamento de Pacotes: npm ou yarn.

📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

Node.js (versão 18 ou superior).

Git.

Uma instância do PostgreSQL rodando (localmente ou em serviços como Supabase, Neon ou Docker).

🔧 Configuração e Instalação

Siga os passos abaixo para rodar o projeto localmente.

1. Clonar o repositório

git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio


2. Instalar dependências

npm install
# ou
yarn install


3. Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto. Você pode usar o arquivo .env.example como base (se existir). O arquivo deve conter a URL de conexão com o seu banco de dados PostgreSQL.

Arquivo .env:

# Exemplo de URL de conexão local
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

# Exemplo de URL de conexão (Supabase/Neon/Render)
# DATABASE_URL="postgres://..."


4. Configurar o Banco de Dados (Prisma)

Este projeto utiliza o Prisma. O esquema do banco de dados está definido em prisma/schema.prisma.

Para criar as tabelas no banco de dados, execute a migration:

npx prisma migrate dev --name init


Nota sobre o Schema:
As tabelas criadas serão:

Product (id, name, price, image_url)

Cart (id, subtotal, total)

CartItem (id, cart_id, product_id, quantity)

5. Popular o Banco de Dados (Seed)

Para ver produtos na tela inicial, é necessário popular o banco. Se houver um script de seed configurado no package.json, execute:

npx prisma db seed


Caso não haja script automático, você pode inserir dados manualmente via Prisma Studio:

npx prisma studio


6. Rodar o Projeto

Inicie o servidor de desenvolvimento:

npm run dev


Acesse http://localhost:3000 no seu navegador.

📡 API Endpoints

A aplicação expõe os seguintes endpoints internos (localizados em app/api/):

Método

Rota

Descrição

GET

/api/products

Lista todos os produtos disponíveis.

GET

/api/cart

Retorna o carrinho atual com totais.

POST

/api/cart

Adiciona um item ao carrinho. Body: { productId, quantity }

DELETE

/api/cart/:id

Remove um item do carrinho pelo ID do item.

🗄️ Estrutura do Banco de Dados (Schema)

Abaixo, a definição simplificada do schema.prisma utilizado:


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
  category    Category @relation(fields: [categoryId], references: [id])
  imageUrl    String     @map("image_url")
  cartItems   CartItem[]

  @@map("products")
}

model Category {
  id        Int      @id @default(autoincrement())
  name      String @unique
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


🚀 Deploy

O projeto está otimizado para deploy na Vercel.

Faça o push do código para o GitHub.

Crie uma conta na Vercel e importe o projeto.

Nas configurações do projeto na Vercel, adicione a variável de ambiente DATABASE_URL apontando para o seu banco de dados de produção (ex: Supabase, Neon ou Render Postgres).

O comando de build padrão do Next.js (next build) será executado automaticamente.

Importante: Certifique-se de rodar as migrations no banco de produção (geralmente via comando npx prisma migrate deploy no build step ou conectando localmente na string de produção).

📝 Licença

Este projeto está sob a licença MIT.
