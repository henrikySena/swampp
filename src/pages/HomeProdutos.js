import { renderizarProdutos } from "../components/produto/renderProduto.js";
import { produtos } from "../../data/Produtos.js";
import { adicionarAoCarrinho } from "./Carrinho.js";
import "../styles/HomeProdutos.css";
import "../components/navbar/navbar.css"

export function renderProdutos() {
    const main = document.querySelector('main');

    // Captura todas as marcas únicas dos produtos
    const marcasUnicas = [...new Set(produtos.map(produto => produto.marca))];

    main.innerHTML = `
        <nav class="navbar-produtos">
            <div class="navbar-produtos-container">
                <!-- Logo à esquerda -->
                <div class="navbar-logo">
                    <a href="#home" class="logo-link">swampp</a>
                </div>
                
                <!-- Campo de pesquisa no centro -->
                <div class="navbar-pesquisa">
                    <input type="text" id="pesquisaProduto" class="input-pesquisa" placeholder="Pesquisar por nome ou marca">
                </div>
                
                <!-- Ícones à direita -->
                <div class="navbar-icones">
                    <a href="#favoritos" class="icone-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06 a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </a>
                    <a href="#perfil" class="icone-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z" />
                            <path d="M3 21c0-4.4 3.6-8 9-8s9 3.6 9 8" />
                        </svg>
                    </a>
                    <a href="#carrinho" class="icone-link icone-carrinho">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span class="carrinho-badge" style="display: none;">0</span>
                    </a>
                </div>
            </div>
        </nav>

        <section class="container-produtos">
            <aside class="menu-lateral">
                <div class="filtro-bloco">
                    <h3>Filtrar por Preço</h3>
                    <div class="produtos-filtro-preco">
                        <input type="range" id="filtroPreco" min="0" max="2500" step="50" value="2500">
                        <span>Até R$ <span id="valorPreco">2500</span></span>
                    </div>
                </div>

                <div class="filtro-bloco">
                    <h3>Ordenar por Preço</h3>
                    <select id="filtro-ordenacao" class="select-estilizado">
                        <option value="padrao" selected>Padrão</option>
                        <option value="menor-preco">Menor Preço</option>
                        <option value="maior-preco">Maior Preço</option>
                    </select>
                </div>

                <div class="filtro-bloco">
                    <h3>Filtrar por Categoria</h3>
                    <nav class="produtos-filtros-categorias">
                        <a class="produtos-filtro-btn ativo" data-categoria="todos">Todos</a>
                        <a class="produtos-filtro-btn" data-categoria="roupa">Roupas</a>
                        <a class="produtos-filtro-btn" data-categoria="equipamento">Equipamentos</a>
                        <a class="produtos-filtro-btn" data-categoria="acessorio">Acessórios</a>
                    </nav>
                </div>

                <div class="filtro-bloco">
                    <h3>Filtrar por Marca</h3>
                    <select id="filtroMarca" class="select-estilizado">
                        <option value="todas" selected>Todas</option>
                        ${marcasUnicas.map(marca => `<option value="${marca}">${marca}</option>`).join('')}
                    </select>
                </div>

                <div class="filtro-bloco">
                    <button id="limparFiltros" class="btn-limpar-filtros">Limpar Filtros</button>
                </div>
            </aside>

            <section class="produtos-destaques">
                <p id="contador-produtos" class="contador-produtos"></p>
                <div class="produtos" id="lista-produtosEmDestaque"></div>
            </section>
        </section>

        <button id="scrollToTopBtn" class="scroll-to-top-btn">
            <i class="fas fa-chevron-up"></i>
        </button>
    `;

    // Inicializar badge do carrinho
    const carrinhoLink = document.querySelector('.icone-carrinho');
    if (carrinhoLink) {
        const badge = carrinhoLink.querySelector('.carrinho-badge');
        setInterval(() => {
            const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            badge.textContent = carrinho.length;
            badge.style.display = carrinho.length > 0 ? 'block' : 'none';
        }, 1000);
    }

    const listaProdutosEmDestaque = document.getElementById("lista-produtosEmDestaque");
    const filtroPreco = document.getElementById("filtroPreco");
    const valorPreco = document.getElementById("valorPreco");
    const filtroMarca = document.getElementById("filtroMarca");
    const filtroOrdenacao = document.getElementById("filtro-ordenacao");
    const botaoLimpar = document.getElementById("limparFiltros");
    const contadorProdutos = document.getElementById("contador-produtos");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const pesquisaProduto = document.getElementById("pesquisaProduto");
    let categoriaAtiva = "todos";
    let marcaAtiva = "todas";
    let termoPesquisa = "";

    renderizarProdutos("todos", listaProdutosEmDestaque, produtos, adicionarAoCarrinho);
    atualizarContador(produtos.length);

    // Filtro por categoria (botões)
    const botoesFiltro = document.querySelectorAll('.produtos-filtro-btn');
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
            botao.classList.add('ativo');
            categoriaAtiva = botao.getAttribute('data-categoria');
            filtrarProdutos();
        });
    });

    filtroPreco.addEventListener('input', () => {
        valorPreco.textContent = filtroPreco.value;
        filtrarProdutos();
    });

    filtroMarca.addEventListener('change', () => {
        marcaAtiva = filtroMarca.value;
        filtrarProdutos();
    });

    filtroOrdenacao.addEventListener('change', filtrarProdutos);

    pesquisaProduto.addEventListener('input', () => {
        termoPesquisa = pesquisaProduto.value.trim().toLowerCase();
        filtrarProdutos();
    });

    botaoLimpar.addEventListener('click', () => {
        filtroPreco.value = 2500;
        valorPreco.textContent = 2500;
        filtroMarca.value = "todas";
        filtroOrdenacao.value = "padrao";
        categoriaAtiva = "todos";
        marcaAtiva = "todas";
        termoPesquisa = "";
        pesquisaProduto.value = "";

        botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
        document.querySelector('[data-categoria="todos"]').classList.add('ativo');

        renderizarProdutos("todos", listaProdutosEmDestaque, produtos, adicionarAoCarrinho);
        atualizarContador(produtos.length);
    });

    function filtrarProdutos() {
        let produtosFiltrados = produtos.filter(produto => {
            const dentroCategoria = categoriaAtiva === "todos" || produto.categoria === categoriaAtiva;
            const dentroPreco = produto.preco <= Number(filtroPreco.value);
            const dentroMarca = marcaAtiva === "todas" || produto.marca === marcaAtiva;
            const dentroPesquisa = !termoPesquisa || 
                produto.nome.toLowerCase().includes(termoPesquisa) || 
                produto.marca.toLowerCase().includes(termoPesquisa);
            return dentroCategoria && dentroPreco && dentroMarca && dentroPesquisa;
        });

        if (filtroOrdenacao.value === "menor-preco") {
            produtosFiltrados.sort((a, b) => a.preco - b.preco);
        } else if (filtroOrdenacao.value === "maior-preco") {
            produtosFiltrados.sort((a, b) => b.preco - a.preco);
        }

        renderizarProdutos(categoriaAtiva, listaProdutosEmDestaque, produtosFiltrados, adicionarAoCarrinho);
        atualizarContador(produtosFiltrados.length);
    }

    function atualizarContador(quantidade) {
        contadorProdutos.textContent = `${quantidade} produto(s) encontrado(s)`;
    }

    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}