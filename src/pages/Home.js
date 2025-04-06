import { navbarLinks, criarNavbar } from '../components/navbar.js';
import { produtos } from '../../data/Produtos.js';
import '../styles/home.css'

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
      <h1>Bem-vindo à nossa loja de roupas!</h1>
      <p>Moda com estilo e personalidade para todos os gostos.</p>
    </section>

    <section class="destaques">
      <h2>Destaques da semana</h2>
      <div class="produtos" id="lista-produtos"></div>
    </section>
  `;

  // Agora sim, os elementos existem no DOM
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

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

  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    const slidesContainer = document.getElementById('slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Avança automaticamente os slides a cada 5 segundos
let slideInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 5000); // 5000ms = 5 segundos

// Opcional: reinicia o timer quando clicar manualmente (pra evitar conflito)
function restartAutoSlide() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 5000);
}

  // Renderizar os produtos em destaque
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
