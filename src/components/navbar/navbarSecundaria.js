// /src/components/navbar/navbarSecundaria.js
import "./navbarSecundaria.css";

export function criarNavbarProdutos() {
  const navbar2 = document.createElement("nav");
  navbar2.className = "navbar-produtos";

  navbar2.innerHTML = `
    <div class="navbar-produtos-container">
      <!-- Logo à esquerda -->
      <div class="navbar-logo">
        <a href="#home" class="logo-link">swampp</a>
      </div>
      
      <!-- Campo de pesquisa no centro -->
      <div class="navbar-pesquisa">
        <div class="pesquisa-container">
          <input type="text" id="pesquisaProduto" class="input-pesquisa" placeholder="Pesquisar por nome ou marca">
          <svg class="icone-lupa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      
      <!-- Ícones à direita -->
      <div class="navbar-icones">

        <a href="#perfil" class="icone-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z" />
            <path d="M3 21c0-4.4 3.6-8 9-8s9 3.6 9 8" />
          </svg>
        </a>

        <a href="#favoritos" class="icone-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06 a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </a>
        
        <a href="#carrinho" class="icone-link icone-carrinho">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="carrinho-badge-secundario" style="display: none;">0</span>
        </a>
        
      </div>
    </div>
  `;

  return navbar2;
}