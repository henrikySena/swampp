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

  // nossas rodas
  if (
    hash === '' ||
    hash === '#home' ||
    hash === '#sobre' ||
    hash === '#favoritos' ||
    hash === '#perfil' ||
    hash === '#buscar'
  ) {
    renderHome();
  } else if (hash.startsWith('#carrinho')) {
    renderCarrinho();
  } else if (hash.startsWith('#produtos')) {
    renderProdutos();
  } else if (hash.startsWith('#produto')) {
    renderProduto();
  } else {
    // Qualquer outra rota desconhecida também pode cair como fallback para Home
    renderHome();
  }
}
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
