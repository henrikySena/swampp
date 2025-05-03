import { renderHome } from './pages/Home.js';
import { renderCarrinho } from './pages/Carrinho.js';
import { renderProduto } from './pages/VisualizarProduto.js'; // <- novo
import './global.css';

function router() {
  const hash = window.location.hash;

  if (hash.startsWith('#carrinho')) {
    renderCarrinho();
  } else if (hash.startsWith('#produto')) {
    renderProduto();
  } else {
    renderHome();
  }
}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
