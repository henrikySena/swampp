export const produtosEmDestaque = [
  {
    id: 1, // Adicionado
    nome: "Casaco Impermeável",
    marca: "Quechua",
    preco: 89.99,
    categoria: "roupa",
    imagens: [
      "/produtos/roupas/casaco/azul/casaco-azul.jpg",
      "/produtos/roupas/casaco/azul/casaco-azul1.jpg",
      "/produtos/roupas/casaco/azul/casaco-azul2.jpg",
      "/produtos/roupas/casaco/azul/casaco-azul3.jpg",
      "/produtos/roupas/casaco/azul/casaco-azul4.jpg"
    ],
    variacoes: [
      {
        cor: "Azul",
        corHex: "#5D7A95",
        imagens: [
          "/produtos/roupas/casaco/azul/casaco-azul.jpg",
          "/produtos/roupas/casaco/azul/casaco-azul1.jpg",
          "/produtos/roupas/casaco/azul/casaco-azul2.jpg",
          "/produtos/roupas/casaco/azul/casaco-azul3.jpg",
          "/produtos/roupas/casaco/azul/casaco-azul4.jpg"
        ]
      },
      {
        cor: "Marinho",
        corHex: "#232E3C",
        imagens: [
          "/produtos/roupas/casaco/marinho/casaco-marinho.jpg",
          "/produtos/roupas/casaco/marinho/casaco-marinho1.jpg",
          "/produtos/roupas/casaco/marinho/casaco-marinho2.jpg",
          "/produtos/roupas/casaco/marinho/casaco-marinho3.jpg"
        ]
      }
    ]
  },
  {
    id: 2, // Adicionado
    nome: "Barraca de Camping MH100 para 4 pessoas",
    marca: "Quechua",
    preco: 449.99,
    categoria: "equipamento",
    imagens: [
      "/produtos/equipamentos/barracas/mh100-4p/mh100-4pessoas.jpg",
      "/produtos/equipamentos/barracas/mh100-4p/mh100-4pessoas1.jpg",
      "/produtos/equipamentos/barracas/mh100-4p/mh100-4pessoas2.jpg",
      "/produtos/equipamentos/barracas/mh100-4p/mh100-4pessoas3.jpg",
      "/produtos/equipamentos/barracas/mh100-4p/mh100-4pessoas4.jpg"
    ],
    variacoes: []
  },
  {
    id: 3, // Adicionado
    nome: "Mochila de Trilha MH500 30 Litros",
    marca: "Quechua",
    preco: 599.99,
    categoria: "acessorio",
    imagens: [
      "/produtos/acessorios/mochilas/mh500-30L/mh500-30L.jpg",
      "/produtos/acessorios/mochilas/mh500-30L/mh500-30L1.jpg",
      "/produtos/acessorios/mochilas/mh500-30L/mh500-30L2.jpg",
      "/produtos/acessorios/mochilas/mh500-30L/mh500-30L-descrition.jpg",
    ],
    variacoes: []
  },
];

export const produtos = [
  {
    id: 4, // Adicionado
    nome: "Camiseta Lisa de Algodão Peruano",
    marca: "Quechua",
    preco: 49.99,
    categoria: ["masculino", "feminino"],
    variacoes: [
      {
        cor: "Azul",
        corHex: "#232E3C",
        imagem: "/produtos/camiseta-azul.png"
      },
      {
        cor: "Terracota",
        corHex: "#BE401D",
        imagem: "/produtos/camiseta-terracota.png"
      },
      {
        cor: "Branca",
        corHex: "#ffffff",
        imagem: "/produtos/camiseta-branca.png"
      }
    ]
  }
];