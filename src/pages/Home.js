import { navbarLinks, criarNavbar } from '../components/navbar/navbar.js';
import { produtosEmDestaque } from '../../data/Produtos.js';
import { adicionarAoCarrinho } from './Carrinho.js';
import { renderizarProdutos } from '../components/produto/renderProduto.js'; // Nova importação
import '../styles/produtos.css';
import '../styles/home.css';
import { carousel } from '../components/carousel/carousel.js';

console.log(navbarLinks); // Teste se está funcionando
criarNavbar(); // Adiciona a navbar na tela

export function renderHome() {
  console.log('Página Home carregada');

  const main = document.querySelector('main');
  main.innerHTML = `
    <section class="hero" id="home">
      <div class="carousel">
        <div class="slides" id="slides">
          <img src="/home/carousel/img-carousel.png" class="slide" alt="Slide 1">
          <img src="/home/carousel/img-carousel1.png" class="slide" alt="Slide 2">
          <img src="/home/carousel/img-carousel2.png" class="slide" alt="Slide 3">
          <img src="/home/carousel/img-carousel3.png" class="slide" alt="Slide 4">
          <img src="/home/carousel/img-carousel4.png" class="slide" alt="Slide 5">
          <img src="/home/carousel/img-carousel5.png" class="slide" alt="Slide 6">
          <img src="/home/carousel/img-carousel6.png" class="slide" alt="Slide 7">
        </div>

        <!-- Mensagem e Botão sobrepondo o Carrossel -->
        <div class="hero-overlay">
          <h1>Seja muito bem-vindo(a) à Swampp!</h1>
          <h4>Aqui você tem acesso aos melhores produtos do mercado</h4>
          <a class="carrosel-tag">roupas</a>
          <a class="carrosel-tag">equipamentos</a>
          <a class="carrosel-tag">acessórios</a>
          <div>
            <a href="#produtos" class="cta-button">Descubra mais!</a>
          </div>
          
        </div>

        <button class="carousel-btn prev" id="prevBtn"><i class="fas fa-chevron-left"></i></button>
        <button class="carousel-btn next" id="nextBtn"><i class="fas fa-chevron-right"></i></button>
      </div>
    </section>


    <section class="destaques">
      <h2 class="titulo-destaques">Destaques da semana!</h2>
      <div class="filtros-categorias">
        <a class="filtro-btn ativo" data-categoria="todos">Todos</a>
        <a class="filtro-btn" data-categoria="roupa">Roupas</a>
        <a class="filtro-btn" data-categoria="equipamento">Equipamentos</a>
        <a class="filtro-btn" data-categoria="acessorio">Acessórios</a>
      </div>
      <div class="produtos" id="lista-produtosEmDestaque"></div>
    </section>

    <section id="sobre">
      <section class="home-banner"></section>

      <section class="text-home-container">
        <h2 class="titulo-home-container">Você sabia que sua compra é consciente?</h2>
        <p class="paragrafo-home-container">Na Swampp, 35% do valor das vendas é destinado a ações de preservação ambiental. Mais do que incentivar a aventura e a conexão com a natureza, temos a missão de contribuir para a conservação do meio ambiente e do bem-estar de todos os seres.</p>
      </section>

    
      <section class="home-grid">
        <div class="inteira">
          <div class="secao-superior">
            <div class="coluna1">
              <div class="bloco1">
                <div class="grid-tag">roupas</div>
                <a href="/pagina1.html" class="grid-btn" id="btn1">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div class="coluna2">
              <div class="bloco2-superior">
                <div class="grid-tag">equipamentos</div>
                <a href="#" class="grid-btn" id="btn2">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
              <div class="bloco2-inferior">
                <div class="grid-tag">acessórios</div>
                <a href="#" class="grid-btn" id="btn3">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div class="coluna3">
              <div class="bloco3-superior">
                <a href="#" class="grid-btn" id="btn4">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
              <div class="bloco3-central">
                <a href="#" class="grid-btn" id="btn5">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
              <div class="bloco3-inferior">
                <a href="#" class="grid-btn" id="btn6">
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="secao-inferior">
            <div class="varias-tags">
              <div class="grid-tag">as novidades apareceram com essa tag</div>
            </div>
            <a href="#" class="grid-btn2" id="btn6">
              Conhecer mais sobre
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
    </section>
  `;

  // Exibe o carrossel
  carousel();

  // Filtragem de produtos em destaque
  const listaProdutosEmDestaque = document.getElementById('lista-produtosEmDestaque');

  // Renderiza os produtos inicialmente
  renderizarProdutos('todos', listaProdutosEmDestaque, produtosEmDestaque, adicionarAoCarrinho);

  // Configura os filtros
  const botoesFiltro = document.querySelectorAll('.filtro-btn');
  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
      botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
      botao.classList.add('ativo');
      const categoria = botao.getAttribute('data-categoria');
      renderizarProdutos(categoria, listaProdutosEmDestaque, produtosEmDestaque, adicionarAoCarrinho);
    });
  });
}