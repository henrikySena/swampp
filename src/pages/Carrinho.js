import { criarNavbarProdutos } from "../components/navbar/navbarSecundaria.js";
import '../styles/carrinho.css';

export function renderCarrinho() {
  const main = document.querySelector('main');
  if (!main) {
    console.error("Elemento <main> não encontrado no DOM");
    return;
  }

  main.innerHTML = `
    <h1>Carrinho de Compras</h1>
    <div id="carrinho-container"></div>
    <a href="#home" id="voltar-home">Voltar para Home</a>
  `;

  try {
    const navbar = criarNavbarProdutos();
    document.body.prepend(navbar);
    atualizarCarrinhoBadge();
  } catch (error) {
    console.error("Erro ao inicializar a navbar:", error);
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoContainer = document.getElementById('carrinho-container');

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = 'Seu carrinho está vazio!';
    return;
  }

  carrinho.forEach(produto => {
    const produtoId = parseInt(produto.id); // Converte para número para consistência
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto-carrinho-carrinho');
    produtoDiv.setAttribute('data-id', produtoId);
    produtoDiv.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem-carrinho">
      <p class="produto-nome-carrinho">${produto.nome}</p>
      <p class="produto-preco-carrinho">R$ ${produto.preco.toFixed(2)}</p>
      <button class="remover-btn" data-id="${produtoId}" aria-label="Remover item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    produtoDiv.addEventListener('click', (e) => {
      if (!e.target.closest('.remover-btn')) {
        console.log('Redirecionando para produto com ID:', produtoId); // Para depuração
        window.location.hash = `#produto?id=${produtoId}`;
      }
    });

    carrinhoContainer.appendChild(produtoDiv);
  });

  carrinhoContainer.querySelectorAll('.remover-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('data-id');
      if (id) {
        removerDoCarrinho(id);
        renderCarrinho();
      }
    });
  });

  let total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
  const totalDiv = document.createElement('div');
  totalDiv.classList.add('total');
  totalDiv.innerHTML = `Total: R$ ${total.toFixed(2)}`;
  carrinhoContainer.appendChild(totalDiv);

  document.getElementById('voltar-home').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
  });
}

export function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (!produto.id) {
    console.error("ID do produto não fornecido:", produto);
    return;
  }
  const produtoComIdNumerico = {
    ...produto,
    id: parseInt(produto.id) // Garante que o ID seja um número
  };
  console.log('Produto salvo no carrinho:', produtoComIdNumerico); // Para depuração
  carrinho.push(produtoComIdNumerico);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinhoBadge();
}

export function removerDoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const idNumerico = parseInt(id); // Converte para número para consistência
  const novoCarrinho = carrinho.filter(produto => parseInt(produto.id) !== idNumerico);
  localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  atualizarCarrinhoBadge();
}

export function atualizarCarrinhoBadge() {
  const badge = document.querySelector('.carrinho-badge-secundario-carrinho');
  if (badge) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    badge.textContent = carrinho.length;
    badge.style.display = carrinho.length > 0 ? 'inline-block' : 'none';
  }
}