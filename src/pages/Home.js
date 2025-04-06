import { navbarLinks, criarNavbar } from '../components/navbar.js';
import { produtos } from '../../data/Produtos.js';
import '../styles/home.css'

console.log(navbarLinks); // Teste se está funcionando

criarNavbar(); // Adiciona a navbar na tela

export function renderHome() {
  console.log('Página Home carregada');

  const main = document.querySelector('main');
  main.innerHTML = `
    <section class="hero">
      <h1>Bem-vindo à nossa loja de roupas!</h1>
      <p>Moda com estilo e personalidade para todos os gostos.</p>
    </section>

    <section class="destaques">
      <h2>Destaques da semana</h2>
      <div class="produtos" id="lista-produtos"></div>
    </section>
  `;

  const listaProdutos = document.getElementById('lista-produtos');

  produtos.forEach(produto => {
    const div = document.createElement('div');
    div.classList.add('produto');

    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button>Adicionar ao carrinho</button>
    `;

    listaProdutos.appendChild(div);
  });
}
