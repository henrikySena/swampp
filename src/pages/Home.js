import { navbarLinks, criarNavbar } from '../components/navbar.js';
import { produtos } from '../../data/Produtos.js';
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

      <div class="produtos" id="lista-produtos"></div>
    </section>
  `;

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

  // Produtos
  const listaProdutos = document.getElementById('lista-produtos');

  function renderizarProdutos(categoriaSelecionada = "todos") {
    listaProdutos.innerHTML = "";
  
    const produtosFiltrados = categoriaSelecionada === "todos"
      ? produtos
      : produtos.filter(prod => 
          Array.isArray(prod.categoria) 
            ? prod.categoria.includes(categoriaSelecionada) 
            : prod.categoria === categoriaSelecionada
        );
  
    // percorre todos os elementos de 'produto' para criar o elemento na tela
    produtosFiltrados.forEach(produto => {
      // cria uma div
      const div = document.createElement('div');
      div.classList.add('produto'); //insere uma classe a essa div
  
      // preenche essa div criada com os dados de produtos
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
        <p class="produto-marca">${produto.marca}</p>
        <p class="produto-nome">${produto.nome}</p>
        <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
      `;
      
      // adiciona cada novo produto criado dentro do container principal de produtos na tela.
      listaProdutos.appendChild(div);
    });
  }

  renderizarProdutos();

  const botoesFiltro = document.querySelectorAll('.filtro-btn');
  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
    // Remove a classe 'ativo' de todos
    botoesFiltro.forEach(btn => btn.classList.remove('ativo'));

    // Adiciona no botão clicado
    botao.classList.add('ativo');

    const categoria = botao.getAttribute('data-categoria');
    renderizarProdutos(categoria);
  });
});
}
