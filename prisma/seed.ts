
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando banco de dados antigo...');
  
  // A ordem importa! Apague os filhos antes dos pais.
  await prisma.cartItem.deleteMany(); // Apaga itens do carrinho primeiro
  await prisma.cart.deleteMany();     // Apaga os carrinhos
  await prisma.product.deleteMany();  // Apaga produtos
  await prisma.category.deleteMany(); // Apaga categorias
  await prisma.user.deleteMany();     // Apaga usuários por último

  console.log('Banco limpo! Iniciando inserção...');

    console.log('Iniciando o seeding...');

  // --- 1. Usuários (Users) ---
  console.log('Criando usuários...');
  const usersData = [
    { name: 'Alice Silva', email: 'alice@example.com', password: bcrypt.hashSync('senha123', 10), cep: '59625-970' },
    { name: 'Bruno Costa', email: 'bruno@example.com', password: bcrypt.hashSync('senha123', 10), cep: '01001-000' },
    { name: 'Carla Dias', email: 'carla@example.com', password: bcrypt.hashSync('senha123', 10), cep: '20040-020' },
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
    // --- Eletrônicos ---
    { 
        name: 'Smartphone Pro Max', 
        price: 6999.00, 
        description: 'O melhor smartphone do mercado', 
        categoryId: eletronicos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Smart TV 55"', 
        price: 3500.50, 
        description: 'Smart TV com resolução 4K', 
        categoryId: eletronicos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Fone Bluetooth', 
        price: 450.00, 
        description: 'Fone de ouvido sem fio com cancelamento de ruído', 
        categoryId: eletronicos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Notebook Ultrafino', 
        price: 4999.99, 
        description: 'Notebook leve e potente para profissionais', 
        categoryId: eletronicos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Mouse Gamer RGB', 
        price: 199.90, 
        description: 'Mouse com iluminação RGB e alta precisão', 
        categoryId: eletronicos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop' 
    },

    // --- Livros (Imagens Conceituais/Temáticas) ---
   
    { 
        name: 'O Guia do Mochileiro das Galáxias', 
        price: 45.90, 
        description: 'Livro de ficção científica clássico', 
        categoryId: livros.id, 
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Dom Casmurro', 
        price: 30.00, 
        description: 'Romance clássico brasileiro', 
        categoryId: livros.id, 
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'A Arte da Guerra', 
        price: 25.50, 
        description: 'Livro sobre estratégias militares e de vida', 
        categoryId: livros.id, 
        imageUrl: 'https://images.unsplash.com/photo-1555596873-4d173c7cb7af?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Padrões de Projeto', 
        price: 120.00, 
        description: 'Livro sobre soluções reutilizáveis para problemas comuns de design de software', 
        categoryId: livros.id, 
        imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=800&auto=format&fit=crop' 
    },

    // --- Vestuário ---
    { 
        name: 'Camiseta Algodão Pima', 
        price: 89.90, 
        description: 'Camiseta feita com algodão Pima de alta qualidade', 
        categoryId: vestuario.id, 
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Calça Jeans Slim Fit', 
        price: 150.00, 
        description: 'Calça jeans com corte slim fit', 
        categoryId: vestuario.id, 
        imageUrl: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Tênis Esportivo Running', 
        price: 299.99, 
        description: 'Tênis confortável para corrida e atividades físicas', 
        categoryId: vestuario.id, 
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' 
    },
    
    { 
        name: 'Meias Esportivas (Pack 3)', 
        price: 35.00, 
        description: 'Pacote com 3 pares de meias esportivas', 
        categoryId: vestuario.id, 
        imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop' 
    },

    // --- Alimentos ---
    { 
        name: 'Café Gourmet Moído 500g', 
        price: 45.00, 
        description: 'Café gourmet moído de alta qualidade', 
        categoryId: alimentos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Barra de Chocolate Amargo 70%', 
        price: 15.00, 
        description: 'Barra de chocolate amargo com 70% cacau', 
        categoryId: alimentos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Azeite Extra Virgem 500ml', 
        price: 39.90, 
        description: 'Azeite extra virgem de alta qualidade', 
        categoryId: alimentos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcdcc3a?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Arroz Integral 1kg', 
        price: 12.00, 
        description: 'Arroz integral de alta qualidade', 
        categoryId: alimentos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop' 
    },
    { 
        name: 'Mel Orgânico 300g', 
        price: 28.50, 
        description: 'Mel orgânico puro e natural', 
        categoryId: alimentos.id, 
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop' 
    },
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
