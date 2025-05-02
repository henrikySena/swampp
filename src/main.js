import { renderHome } from './pages/Home.js';
import { renderCarrinho } from './pages/Carrinho.js';
import './global.css';

function router() {
  const hash = window.location.hash;
  if (hash === '#carrinho') {
    renderCarrinho();
  } else {
    renderHome();
  }
}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);