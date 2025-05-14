// /src/main.js
import { renderHome } from './pages/Home.js';
import { renderCarrinho } from './pages/Carrinho.js';
import { renderProduto } from './pages/VisualizarProduto.js';
import { renderProdutos } from './pages/HomeProdutos.js';
import './global.css';

function router() {
  const hash = window.location.hash;
  console.log('Hash atual:', hash);

  // Remove qualquer navbar existente
  const oldNav = document.querySelector('nav');
  if (oldNav) oldNav.remove();

  // Renderiza a página correspondente
  if (hash === '' || hash === '#home') {
    renderHome();
  } else if (hash.startsWith('#carrinho')) {
    renderCarrinho();
  } else if (hash.startsWith('#produtos')) {
    console.log('Chamando renderProdutos');
    renderProdutos();
  } else if (hash.startsWith('#produto')) {
    renderProduto();
  }
}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);