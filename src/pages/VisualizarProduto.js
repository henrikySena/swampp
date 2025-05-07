import { produtosEmDestaque, produtos } from '../../data/Produtos.js';
import { adicionarAoCarrinho } from './Carrinho.js';
import "../styles/visualizarProduto.css";

export function renderProduto() {
  const main = document.querySelector('main');
  main.innerHTML = '';

  // Obtém o ID do produto da hash
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split('?')[1]);
  const produtoId = parseInt(params.get('id'));

  // Busca o produto pelo ID em ambos os arrays
  const produto = [...produtosEmDestaque, ...produtos].find(p => p.id === produtoId);

  if (!produto) {
    main.innerHTML = '<p>Produto não encontrado.</p>';
    return;
  }

  // Define a variação inicial e as imagens
  let variacaoAtual = produto.variacoes?.[0] || null;
  let imagens = produto.imagens || [];
  if (variacaoAtual) {
    imagens = variacaoAtual.imagens || (variacaoAtual.imagem ? [variacao.imagem] : []);
  }

  // Criação do container principal para o produto
  const container = document.createElement('div');
  container.classList.add('produto-container');  // Classe para o contêiner flexível

  // Container das imagens (vai ocupar 60% da tela)
  const imagensDiv = document.createElement('div');
  imagensDiv.classList.add('imagens-lado-a-lado');
  imagensDiv.style.flex = "60%";  // Ocupa 60% da largura da tela

  // Função para renderizar as imagens
  function renderizarImagens(imagensArray) {
    imagensDiv.innerHTML = '';
    if (!imagensArray || imagensArray.length === 0) {
      const placeholder = document.createElement('p');
      placeholder.textContent = 'Imagem não disponível';
      imagensDiv.appendChild(placeholder);
      return;
    }
    imagensArray.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${produto.nome} - Imagem`;
      img.classList.add('produto-imagem');
      imagensDiv.appendChild(img);
    });
  }

  // Renderiza as imagens iniciais
  renderizarImagens(imagens);

  // Container das informações (vai ocupar 40% da tela)
  const informacoesDiv = document.createElement('div');
  informacoesDiv.classList.add('informacoes-produto');
  informacoesDiv.style.flex = "40%";  // Ocupa 40% da largura da tela

  // Marca
  const marca = document.createElement('p');
  marca.textContent = produto.marca || 'Marca não informada';
  marca.classList.add('produto-marca');

  // Nome
  const nome = document.createElement('h2');
  nome.textContent = produto.nome || 'Produto sem nome';
  nome.classList.add('produto-nome');

  // Preço
  const preco = document.createElement('p');
  preco.textContent = `R$ ${produto.preco ? produto.preco.toFixed(2) : '0.00'}`;
  preco.classList.add('produto-preco');

  // Variações
  const variacoesDiv = document.createElement('div');
  variacoesDiv.classList.add('produto-variacoes');

  if (produto.variacoes?.length > 0) {
    produto.variacoes.forEach((variacao, index) => {
      const corBolinha = document.createElement('span');
      corBolinha.classList.add('cor-bolinha');
      if (index === 0) corBolinha.classList.add('ativa');
      corBolinha.style.backgroundColor = variacao.corHex || '#000';
      corBolinha.title = variacao.cor || 'Cor sem nome';
      corBolinha.setAttribute('aria-label', `Selecionar cor ${variacao.cor || 'desconhecida'}`);

      corBolinha.addEventListener('click', () => {
        variacaoAtual = variacao;
        const novasImagens = variacao.imagens || (variacao.imagem ? [variacao.imagem] : []);
        renderizarImagens(novasImagens);
        variacoesDiv.querySelectorAll('.cor-bolinha').forEach(b => b.classList.remove('ativa'));
        corBolinha.classList.add('ativa');
      });

      variacoesDiv.appendChild(corBolinha);
    });
  }

  // Botão "Adicionar ao Carrinho"
  const botaoCarrinho = document.createElement('button');
  botaoCarrinho.textContent = 'Adicionar ao Carrinho';
  botaoCarrinho.classList.add('botao-carrinho');
  botaoCarrinho.setAttribute('aria-label', `Adicionar ${produto.nome} ao carrinho`);
  botaoCarrinho.addEventListener('click', () => {
    const produtoParaCarrinho = {
      nome: produto.nome,
      preco: produto.preco,
      imagem: imagens[0] || '',
    };
    adicionarAoCarrinho(produtoParaCarrinho);
  });

  // Adiciona as informações no container de informações
  informacoesDiv.append(marca, nome, preco, variacoesDiv, botaoCarrinho);

  // Monta o contêiner principal (contendo imagens e informações)
  container.appendChild(imagensDiv);
  container.appendChild(informacoesDiv);

  // Adiciona o container à página
  main.appendChild(container);
}
