
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  // --- 1. Usuários (Users) ---
  console.log('Criando usuários...');
  const usersData = [
    { name: 'Alice Silva', email: 'alice@example.com', password: 'hashedpassword1', cep: '59625-970' },
    { name: 'Bruno Costa', email: 'bruno@example.com', password: 'hashedpassword2', cep: '01001-000' },
    { name: 'Carla Dias', email: 'carla@example.com', password: 'hashedpassword3', cep: '20040-020' },
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
    { name: 'Smartphone Pro Max', price: 6999.00, description: 'O melhor smartphone do mercado', categoryId: eletronicos.id, imageUrl: 'https://img.example.com/phone.jpg' },
    { name: 'Smart TV 55"', price: 3500.50, description: 'Smart TV com resolução 4K', categoryId: eletronicos.id, imageUrl: 'https://img.example.com/tv.jpg' },
    { name: 'Fone Bluetooth', price: 450.00, description: 'Fone de ouvido sem fio com cancelamento de ruído', categoryId: eletronicos.id, imageUrl: 'https://img.example.com/fones.jpg' },
    { name: 'Notebook Ultrafino', price: 4999.99, description: 'Notebook leve e potente para profissionais', categoryId: eletronicos.id, imageUrl: 'https://img.example.com/notebook.jpg' },
    { name: 'Mouse Gamer RGB', price: 199.90, description: 'Mouse com iluminação RGB e alta precisão', categoryId: eletronicos.id, imageUrl: 'https://img.example.com/mouse.jpg' },
    // Livros
    { name: 'Clean Code: Habilidades de um Desenvolvedor Ágil', price: 95.00, description: 'Livro sobre boas práticas de programação', categoryId: livros.id, imageUrl: 'https://img.example.com/cleancode.jpg' },
    { name: 'O Guia do Mochileiro das Galáxias', price: 45.90, description: 'Livro de ficção científica clássico', categoryId: livros.id, imageUrl: 'https://img.example.com/mochileiro.jpg' },
    { name: 'Dom Casmurro', price: 30.00, description: 'Romance clássico brasileiro', categoryId: livros.id, imageUrl: 'https://img.example.com/domcasmurro.jpg' },
    { name: 'A Arte da Guerra', price: 25.50, description: 'Livro sobre estratégias militares e de vida', categoryId: livros.id, imageUrl: 'https://img.example.com/arteguerra.jpg' },
    { name: 'Padrões de Projeto', price: 120.00, description: 'Livro sobre soluções reutilizáveis para problemas comuns de design de software', categoryId: livros.id, imageUrl: 'https://img.example.com/patterns.jpg' },

    // Vestuário
    { name: 'Camiseta Algodão Pima', price: 89.90, description: 'Camiseta feita com algodão Pima de alta qualidade', categoryId: vestuario.id, imageUrl: 'https://img.example.com/camiseta.jpg' },
    { name: 'Calça Jeans Slim Fit', price: 150.00, description: 'Calça jeans com corte slim fit', categoryId: vestuario.id, imageUrl: 'https://img.example.com/jeans.jpg' },
    { name: 'Tênis Esportivo Running', price: 299.99, description: 'Tênis confortável para corrida e atividades físicas', categoryId: vestuario.id, imageUrl: 'https://img.example.com/tenis.jpg' },
    { name: 'Jaqueta Corta Vento', price: 199.90, description: 'Jaqueta leve e resistente ao vento', categoryId: vestuario.id, imageUrl: 'https://img.example.com/jaqueta.jpg' },
    { name: 'Meias Esportivas (Pack 3)', price: 35.00, description: 'Pacote com 3 pares de meias esportivas', categoryId: vestuario.id, imageUrl: 'https://img.example.com/meias.jpg' },

    // Alimentos
    { name: 'Café Gourmet Moído 500g', price: 45.00, description: 'Café gourmet moído de alta qualidade', categoryId: alimentos.id, imageUrl: 'https://img.example.com/cafe.jpg' },
    { name: 'Barra de Chocolate Amargo 70%', price: 15.00, description: 'Barra de chocolate amargo com 70% cacau', categoryId: alimentos.id, imageUrl: 'https://img.example.com/chocolate.jpg' },
    { name: 'Azeite Extra Virgem 500ml', price: 39.90, description: 'Azeite extra virgem de alta qualidade', categoryId: alimentos.id, imageUrl: 'https://img.example.com/azeite.jpg' },
    { name: 'Arroz Integral 1kg', price: 12.00, description: 'Arroz integral de alta qualidade', categoryId: alimentos.id, imageUrl: 'https://img.example.com/arroz.jpg' },
    { name: 'Mel Orgânico 300g', price: 28.50, description: 'Mel orgânico puro e natural', categoryId: alimentos.id, imageUrl: 'https://img.example.com/mel.jpg' },
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
