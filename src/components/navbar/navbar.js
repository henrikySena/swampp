import './navbar.css';

export const navbarLinks = {
  esquerda: [
    { texto: 'Home', url: '#home' },
    { texto: 'Produtos', url: '#produtos' },
    { texto: 'Sobre', url: '#sobre' }
  ],
  direita: [
    {
      texto: '',
      url: '#perfil',
      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            width="24" height="24">
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z" />
          <path d="M3 21c0-4.4 3.6-8 9-8s9 3.6 9 8" />
        </svg>`
    },
    {
      texto: '',
      url: '#buscar',
      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>`
    },
    {
      texto: '',
      url: '#favoritos',
      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                  a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
                  1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      `
    },
    {
      texto: '',
      url: '#carrinho',
      svg: `
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.3" 
             stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 
                   2 0 0 0 2-1.61L23 6H6"></path>
        </svg>`
    }
  ],
  centro: 'swampp',
};

export function criarNavbar() {
  // Remove navbar antiga se já existir
  const oldNav = document.querySelector('.navbar');
  if (oldNav) oldNav.remove();

  // Cria a navbar
  const nav = document.createElement('nav');
  nav.classList.add('navbar');

  const navContainer = document.createElement('div');
  navContainer.classList.add('navbar-container');

  // Links à esquerda
  const navLeft = document.createElement('div');
  navLeft.classList.add('nav-left');
  navbarLinks.esquerda.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url ?? "#";
    a.textContent = link.texto;
    navLeft.appendChild(a);
  });

  // Título centralizado
  const navCenter = document.createElement('div');
  navCenter.classList.add('nav-center');
  const centerLink = document.createElement('a');
  centerLink.href = '#home';
  centerLink.textContent = navbarLinks.centro;
  navCenter.appendChild(centerLink);

  // Ícones à direita
  const navRight = document.createElement('div');
  navRight.classList.add('nav-right');
  navbarLinks.direita.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url ?? "#";
    a.innerHTML = `${link.svg ?? ''}<span>${link.texto}</span>`;

    if (link.url === '#carrinho') {
      inicializarBadge(a);
    }

    navRight.appendChild(a);
  });

  // Monta tudo
  navContainer.appendChild(navLeft);
  navContainer.appendChild(navCenter);
  navContainer.appendChild(navRight);
  nav.appendChild(navContainer);
  document.body.prepend(nav);

  // Aplica o estilo inicial da navbar
  updateNavbarStyle();
}

// Função para atualizar o estilo da navbar
export function updateNavbarStyle() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  // nossas rodas
  const hash = window.location.hash;
  const isHomePage =
  hash === '' ||
  hash === '#home' ||
  hash === '#sobre' ||
  hash === '#perfil' ||
  hash === '#favoritos' ||
  hash === '#buscar';


  // Remove qualquer listener de scroll existente para evitar duplicatas
  window.onscroll = null;

  if (isHomePage) {
    nav.classList.remove('opacity-full');
    const handleScroll = () => {
      nav.classList.toggle('blur', window.scrollY > 10);
    };
    window.onscroll = handleScroll;
    // Aplica o estado inicial baseado na posição atual do scroll
    handleScroll();
  } else {
    nav.classList.add('opacity-full');
    nav.classList.remove('blur');
  }
}

// Função para inicializar o badge do carrinho
function inicializarBadge(anchor) {
  const badge = document.createElement('span');
  badge.classList.add('carrinho-badge');
  badge.textContent = '0';
  badge.style.display = 'none';
  anchor.appendChild(badge);

  // Atualiza o contador a cada segundo
  setInterval(atualizarContadorCarrinho, 1000);
}

export function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  
    // Atualiza o badge da navbar principal
    const carrinhoLink = document.querySelector('a[href="#carrinho"]');
    const badgePrincipal = carrinhoLink?.querySelector('.carrinho-badge');
    if (badgePrincipal) {
        badgePrincipal.textContent = carrinho.length;
        badgePrincipal.style.display = carrinho.length > 0 ? 'block' : 'none';
    }
  
    // Atualiza o badge da navbar secundaria, se existir
    const carrinhoSecundario = document.querySelector('a[href="#carrinho"]');
    const badgeSecundario = carrinhoSecundario?.querySelector('.carrinho-badge-secundario');
    if (badgeSecundario) {
        badgeSecundario.textContent = carrinho.length;
        badgeSecundario.style.display = carrinho.length > 0 ? 'block' : 'none';
    }
}