import { navbarLinks, criarNavbar } from '../components/navbar.js';
import { produtosEmDestaque } from '../../data/Produtos.js';
import '../styles/produtos.css';
import '../styles/home.css';

console.log(navbarLinks); // Teste se está funcionando

criarNavbar(); // Adiciona a navbar na tela

export function renderHome() {
  console.log('Página Home carregada');

  const main = document.querySelector('main');
  main.innerHTML = `
    <section class="hero" id="home">
      <div class="carousel">
        <div class="slides" id="slides">
          <img src="../../public/home/img-home1.png" class="slide" alt="Slide 1">
          <img src="../../public/home/img-home2.png" class="slide" alt="Slide 2">
          <img src="../../public/home/img-home3.png" class="slide" alt="Slide 3">
        </div>
        <button class="carousel-btn prev" id="prevBtn"><i class="fas fa-chevron-left"></i></button>
        <button class="carousel-btn next" id="nextBtn"><i class="fas fa-chevron-right"></i></button>
      </div>
    </section>
    
    <section class="destaques">
      <h2 class="titulo-destaques">Destaques da semana</h2>

      <div class="filtros-categorias">
        <a class="filtro-btn" data-categoria="todos">Todos</a>
        <a class="filtro-btn" data-categoria="masculino">Masculino</a>
        <a class="filtro-btn" data-categoria="feminino">Feminino</a>
        <a class="filtro-btn" data-categoria="infantil">Infantil</a>

      </div>

      <div class="produtos" id="lista-produtosEmDestaque"></div>
    </section>


    <section class="home-banner">
    </section>


    <section class="text-home-container">
      <h2 class="titulo-home-container">Lorem ipsum dolor sit amet.</h2>
      <p class="paragrafo-home-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat.</p>
    </section>

<section class="home-grid">
  <div class="inteira">
    <div class="metade-cima">
      <div class="metade1">
        <div class="metadinha1">
          <a href="/pagina1.html" class="grid-btn" id="btn1">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="metade2">
        <div class="metadinha2-cima">
          <a href="#" class="grid-btn" id="btn2">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div class="metadinha2-baixo">
          <a href="#" class="grid-btn" id="btn3">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="metade3">
        <div class="metadinha3-cima">
          <a href="#" class="grid-btn" id="btn4">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div class="metadinha3-meio">
          <a href="#" class="grid-btn" id="btn5">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div class="metadinha3-baixo">
          <a href="#" class="grid-btn" id="btn6">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
      
    </div>
        <div class="metade-baixo">
          <a href="#" class="grid-btn2" id="btn6">
            Loren ipsum dolor
            <i class="fa-solid fa-arrow-right"></i>
          </a>
    </div>

  </div>
</section>


  `;

  // <div class="highlight-text">
  //   <h2>Os melhores produtos</h2>
  //   <p>De orgânicos a naturais — cada escolha conta para preservar a natureza.</p>
  //   <div class="highlight-tags">
  //     <span>Natureza</span>
  //     <span>Cuidado</span>
  //     <span>Pureza</span>
  //     <span>Estilo de vida</span>
  //   </div>
  //   <a href="#" class="highlight-button">Saiba mais</a>
  // </div>


  // Carousel
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  const updateCarousel = () => {
    const slideWidth = slides[0].clientWidth;
    const slidesContainer = document.getElementById('slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  let slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 5000);

  const restartAutoSlide = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }, 5000);
  };

  document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
    restartAutoSlide();
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
    restartAutoSlide();
  });

  // produtosEmDestaque
  const listaprodutosEmDestaque = document.getElementById('lista-produtosEmDestaque');

  function renderizarprodutosEmDestaque(categoriaSelecionada = "todos") {
    listaprodutosEmDestaque.innerHTML = "";
  
    const produtosEmDestaqueFiltrados = categoriaSelecionada === "todos"
      ? produtosEmDestaque
      : produtosEmDestaque.filter(prod => 
          Array.isArray(prod.categoria) 
            ? prod.categoria.includes(categoriaSelecionada) 
            : prod.categoria === categoriaSelecionada
        );
  
        produtosEmDestaqueFiltrados.forEach(produto => {
          const div = document.createElement('div');
          div.classList.add('produto');
      
          // Imagem principal (default: primeira variação)
          const imagemPrincipal = document.createElement('img');
          imagemPrincipal.classList.add('produto-img');
          imagemPrincipal.src = produto.variacoes[0].imagem;
          imagemPrincipal.alt = produto.nome;
      
          // Nome, marca, preço
          const marca = document.createElement('p');
          marca.classList.add('produto-marca');
          marca.textContent = produto.marca;
      
          const nome = document.createElement('p');
          nome.classList.add('produto-nome');
          nome.textContent = produto.nome;
      
          const preco = document.createElement('p');
          preco.classList.add('produto-preco');
          preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
      
          // Cores
          const variacoesDiv = document.createElement('div');
          variacoesDiv.classList.add('produto-variacoes');
      
          produto.variacoes.forEach((variacao, index) => {
            const corBolinha = document.createElement('span');
            corBolinha.classList.add('cor-bolinha');
            if (index === 0) corBolinha.classList.add('ativa'); // bolinha ativa inicial
            corBolinha.style.backgroundColor = variacao.corHex;
            corBolinha.title = variacao.cor;
      
            // Evento de clique na bolinha
            corBolinha.addEventListener('click', () => {
              imagemPrincipal.src = variacao.imagem;
      
              // Remove classe ativa de todas
              const todasBolinhas = variacoesDiv.querySelectorAll('.cor-bolinha');
              todasBolinhas.forEach(b => b.classList.remove('ativa'));
      
              // Ativa só a clicada
              corBolinha.classList.add('ativa');
            });
      
            variacoesDiv.appendChild(corBolinha);
          });
      
          // Montagem do produto
          div.appendChild(imagemPrincipal);
          div.appendChild(variacoesDiv);
          div.appendChild(marca);
          div.appendChild(nome);
          div.appendChild(preco);
      
          listaprodutosEmDestaque.appendChild(div);
        });
      }

  renderizarprodutosEmDestaque();

  const botoesFiltro = document.querySelectorAll('.filtro-btn');
  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
    // Remove a classe 'ativo' de todos
    botoesFiltro.forEach(btn => btn.classList.remove('ativo'));

    // Adiciona no botão clicado
    botao.classList.add('ativo');

    const categoria = botao.getAttribute('data-categoria');
    renderizarprodutosEmDestaque(categoria);
  });
});
}
