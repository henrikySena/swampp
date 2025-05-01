// isso está sendo usado como nosso banco de dados de produtos

// produtos em destaque -------------------------------------------------------------------------------------
export const produtosEmDestaque = [
  {
    nome: "Camiseta Lisa de Algodão Peruano",
    marca: "Tribord",
    preco: 89.99,
    categoria: "roupa",
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
  },
  {
    nome: "Barraca de Camping MH100 para 3 pessoas",
    marca: "Tribord",
    preco: 349.99,
    categoria: "equipamento",
    variacoes: [
      {
        imagem: "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas.jpg"
      },
      {
        imagem: "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas1.jpg"
      },
      {
        imagem: "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas2.jpg"
      },
      {
        imagem: "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas3.jpg"
      },
      {
        imagem: "/produtos/equipamentos/barracas/mh100-3p/mh100-3pessoas4.jpg"
      }
    ]
  },
  {
    nome: "Mochila de Trilha 50L",
    marca: "Forclaz",
    preco: 29.99,
    categoria: "acessorio",
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
      }
    ]
  }
];

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
