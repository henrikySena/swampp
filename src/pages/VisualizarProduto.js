import { produtosEmDestaque, produtos } from '../../data/Produtos.js';
import { adicionarAoCarrinho } from './Carrinho.js';
import "../styles/visualizarProduto.css";

export function renderProduto() {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split('?')[1]);
  const produtoId = parseInt(params.get('id'));

  const produto = [...produtosEmDestaque, ...produtos].find(p => p.id === produtoId);

  if (!produto) {
    main.innerHTML = '<p>Produto não encontrado.</p>';
    return;
  }

  let variacaoAtual = produto.variacoes?.[0] || null;
  let imagens = produto.imagens || [];
  if (variacaoAtual) {
    imagens = variacaoAtual.imagens || (variacaoAtual.imagem ? [variacaoAtual.imagem] : []);
  }

  const containerYU = document.createElement('div');
  containerYU.classList.add('produto-container');

  const imagensDiv = document.createElement('div');
  imagensDiv.classList.add('imagens-lado-a-lado');
  imagensDiv.style.flex = "70%";

  function renderizarImagens(imagensArray) {
    imagensDiv.innerHTML = '';
    if (!imagensArray || imagensArray.length === 0) {
      const placeholder = document.createElement('p');
      placeholder.textContent = 'Imagem não disponível';
      imagensDiv.appendChild(placeholder);
      return;
    }
    imagensArray.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${produto.nome} - Imagem`;
      img.classList.add('produto-imagem');
      if (index === 0) img.classList.add('imagem-principal');
      imagensDiv.appendChild(img);
    });
  }

  renderizarImagens(imagens);

  const detalhesProdutoDiv = document.createElement('div');
  detalhesProdutoDiv.classList.add('detalhes-produto');
  detalhesProdutoDiv.style.flex = "30%";

  const informacoesDiv = document.createElement('div');
  informacoesDiv.classList.add('informacoes-produto');

  const marca = document.createElement('p');
  marca.textContent = produto.marca || 'Marca não informada';
  marca.classList.add('produto-marca-unica');

  const nome = document.createElement('h2');
  nome.textContent = produto.nome || 'Produto sem nome';
  nome.classList.add('produto-nome');

  const preco = document.createElement('p');
  preco.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  preco.classList.add('produto-preco', 'preco-customizado');

  const vendedorInfo = document.createElement('p');
  vendedorInfo.classList.add('vendedor-info');
  vendedorInfo.innerHTML = `
    <span class="fa fa-shield-alt vendedor-icone"></span>
    <p>Vendido e entregue por <strong> Swampp</strong></p>
  `;

  const avaliacao = document.createElement('div');
  avaliacao.classList.add('produto-avaliacao');
  avaliacao.innerHTML = `
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star-half-stroke checked"></span>
    <span class="avaliacao-nota">(4,8/5)</span>
  `;

  const corSelecionadaTexto = document.createElement('p');
  corSelecionadaTexto.classList.add('cor-selecionada');
  corSelecionadaTexto.textContent = `Cor: ${variacaoAtual?.cor || 'Única'}`;

  const coresDiv = document.createElement('div');
  coresDiv.classList.add('selecao-cores');

  const variacoesDiv = document.createElement('div');
  variacoesDiv.classList.add('produto-variacoes-imagens');

  if (produto.variacoes?.length > 0) {
    produto.variacoes.forEach((variacao, index) => {
      const imagemSelecao = document.createElement('img');
      const primeiraImagem = variacao.imagens?.[0] || variacao.imagem || '';
      imagemSelecao.src = primeiraImagem || 'placeholder.jpg';
      imagemSelecao.alt = `Variacao ${variacao.cor || 'desconhecida'}`;
      imagemSelecao.classList.add('variacao-imagem-selecao');
      if (index === 0) imagemSelecao.classList.add('variacao-ativa');
      imagemSelecao.title = variacao.cor || 'Cor sem nome';
      imagemSelecao.setAttribute('aria-label', `Selecionar variação ${variacao.cor || 'desconhecida'}`);

      imagemSelecao.addEventListener('click', () => {
        variacaoAtual = variacao;
        const novasImagens = variacao.imagens || (variacao.imagem ? [variacao.imagem] : []);
        renderizarImagens(novasImagens);
        corSelecionadaTexto.textContent = `Cor: ${variacao.cor || 'N/A'}`;
        variacoesDiv.querySelectorAll('.variacao-imagem-selecao').forEach(b => b.classList.remove('variacao-ativa'));
        imagemSelecao.classList.add('variacao-ativa');
      });

      variacoesDiv.appendChild(imagemSelecao);
    });
  }

  const botaoCarrinho = document.createElement('button');
  botaoCarrinho.textContent = 'Adicionar ao Carrinho';
  botaoCarrinho.classList.add('botao-carrinho');
  botaoCarrinho.setAttribute('aria-label', `Adicionar ${produto.nome} ao carrinho`);
  botaoCarrinho.addEventListener('click', () => {
    const imagemSelecionada = variacaoAtual?.imagens?.[0] || variacaoAtual?.imagem || imagens[0] || '';

    const produtoParaCarrinho = {
      nome: produto.nome,
      cor: variacaoAtual?.cor || null,
      preco: produto.preco,
      imagem: imagemSelecionada
    };

    adicionarAoCarrinho(produtoParaCarrinho);
  });

  informacoesDiv.append(
    marca,
    nome,
    avaliacao,
    preco,
    vendedorInfo
  );

  coresDiv.append(
    corSelecionadaTexto,
    variacoesDiv,
    botaoCarrinho
  );

  detalhesProdutoDiv.appendChild(informacoesDiv);
  detalhesProdutoDiv.appendChild(coresDiv);

  containerYU.appendChild(imagensDiv);
  containerYU.appendChild(detalhesProdutoDiv);
  main.appendChild(containerYU);
}