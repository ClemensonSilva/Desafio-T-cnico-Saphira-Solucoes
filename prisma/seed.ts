import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  // --- 1. Usuários (Users) ---
  console.log('Criando usuários...');
  const usersData = [
    { name: 'Alice Silva', email: 'alice@example.com', password: 'hashedpassword1', cep: '59625-970' },
    { name: 'Bruno Costa', email: 'bruno@example.com', password: 'hashedpassword2', cep: '01001-000' },
    { name: 'Carla Dias', email: 'carla@example.com', password: 'hashedpassword3' },
  ];

  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  const [alice, bruno, carla] = await prisma.user.findMany({ 
    where: { email: { in: usersData.map(u => u.email) } } 
  });


  // --- 2. Categorias (Categories) ---
  console.log('Criando 4 categorias...');
  const categoriesToCreate = [
    { name: 'Eletrônicos' },
    { name: 'Livros' },
    { name: 'Vestuário' },
    { name: 'Alimentos' },
  ];

  await prisma.category.createMany({
    data: categoriesToCreate,
    skipDuplicates: true,
  });

  const categories = await prisma.category.findMany();
  const [eletronicos, livros, vestuario, alimentos] = categories;
  
  // --- 3. Produtos (Products) ---
  console.log('Criando 5 produtos por categoria...');

  const productsData = [
    // Eletrônicos
    { name: 'Smartphone Pro Max', price: 6999.00, categoryId: eletronicos.id, imageUrl: 'https://img.example.com/phone.jpg' },
    { name: 'Smart TV 55"', price: 3500.50, categoryId: eletronicos.id, imageUrl: 'https://img.example.com/tv.jpg' },
    { name: 'Fone Bluetooth', price: 450.00, categoryId: eletronicos.id, imageUrl: 'https://img.example.com/fones.jpg' },
    { name: 'Notebook Ultrafino', price: 4999.99, categoryId: eletronicos.id, imageUrl: 'https://img.example.com/notebook.jpg' },
    { name: 'Mouse Gamer RGB', price: 199.90, categoryId: eletronicos.id, imageUrl: 'https://img.example.com/mouse.jpg' },
    
    // Livros
    { name: 'Clean Code: Habilidades de um Desenvolvedor Ágil', price: 95.00, categoryId: livros.id, imageUrl: 'https://img.example.com/cleancode.jpg' },
    { name: 'O Guia do Mochileiro das Galáxias', price: 45.90, categoryId: livros.id, imageUrl: 'https://img.example.com/mochileiro.jpg' },
    { name: 'Dom Casmurro', price: 30.00, categoryId: livros.id, imageUrl: 'https://img.example.com/domcasmurro.jpg' },
    { name: 'A Arte da Guerra', price: 25.50, categoryId: livros.id, imageUrl: 'https://img.example.com/arteguerra.jpg' },
    { name: 'Padrões de Projeto', price: 120.00, categoryId: livros.id, imageUrl: 'https://img.example.com/patterns.jpg' },

    // Vestuário
    { name: 'Camiseta Algodão Pima', price: 89.90, categoryId: vestuario.id, imageUrl: 'https://img.example.com/camiseta.jpg' },
    { name: 'Calça Jeans Slim Fit', price: 150.00, categoryId: vestuario.id, imageUrl: 'https://img.example.com/jeans.jpg' },
    { name: 'Tênis Esportivo Running', price: 299.99, categoryId: vestuario.id, imageUrl: 'https://img.example.com/tenis.jpg' },
    { name: 'Jaqueta Corta Vento', price: 199.90, categoryId: vestuario.id, imageUrl: 'https://img.example.com/jaqueta.jpg' },
    { name: 'Meias Esportivas (Pack 3)', price: 35.00, categoryId: vestuario.id, imageUrl: 'https://img.example.com/meias.jpg' },

    // Alimentos
    { name: 'Café Gourmet Moído 500g', price: 45.00, categoryId: alimentos.id, imageUrl: 'https://img.example.com/cafe.jpg' },
    { name: 'Barra de Chocolate Amargo 70%', price: 15.00, categoryId: alimentos.id, imageUrl: 'https://img.example.com/chocolate.jpg' },
    { name: 'Azeite Extra Virgem 500ml', price: 39.90, categoryId: alimentos.id, imageUrl: 'https://img.example.com/azeite.jpg' },
    { name: 'Arroz Integral 1kg', price: 12.00, categoryId: alimentos.id, imageUrl: 'https://img.example.com/arroz.jpg' },
    { name: 'Mel Orgânico 300g', price: 28.50, categoryId: alimentos.id, imageUrl: 'https://img.example.com/mel.jpg' },
  ];

  await prisma.product.createMany({
    data: productsData,
    skipDuplicates: true,
  });
  
  const allProducts = await prisma.product.findMany();
  const product1 = allProducts[0]; // Smartphone
  const product2 = allProducts[5]; // Clean Code
  const product3 = allProducts[10]; // Camiseta

  // --- 4. Carrinhos e Itens (Carts & CartItems) ---
  console.log('Criando carrinhos e itens aleatórios...');
  
  // Carrinho 1: Alice (com 2 itens)
  const cartAlice = await prisma.cart.create({
    data: {
      userId: alice.id,
      items: {
        create: [
          { productId: product1.id, quantity: 1 }, // Smartphone
          { productId: product2.id, quantity: 2 }, // Clean Code (2x)
        ],
      },
    },
  });

  // Carrinho 2: Bruno (vazio, criado recentemente)
  const cartBruno = await prisma.cart.create({
    data: {
      userId: bruno.id,
    },
  });

  console.log(`Seeding concluído! Foram criados ${usersData.length} usuários, ${categoriesToCreate.length} categorias, ${productsData.length} produtos e 2 carrinhos.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });