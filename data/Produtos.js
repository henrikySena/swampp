// isso está sendo usado como nosso banco de dados de produtos

export const produtosEmDestaque = [
  {
    nome: "Casaco Impermeável",
    marca: "Tribord",
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
    nome: "Barraca de Camping MH100 para 3 pessoas",
    marca: "Quechua",
    preco: 349.99,
    categoria: "equipamento",
    imagens: [
      "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas.jpg",
      "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas1.jpg",
      "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas2.jpg",
      "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas3.jpg",
      "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas4.jpg"
    ],
    variacoes: []
  },
  {
    nome: "Mochila de Trilha 30L",
    marca: "Quechua",
    preco: 499.99,
    categoria: "acessorio",
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
      }
    ]
  },
]

// produtos gerais --------------------------------------------------------------------------------------
export const produtos = [
  {
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
