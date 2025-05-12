import { renderizarProdutos } from "../components/produto/renderProduto.js";
import { produtos } from "../../data/Produtos.js";
import { adicionarAoCarrinho } from "./Carrinho.js";
import "../styles/HomeProdutos.css";

export function renderProdutos() {
    const main = document.querySelector('main');

    // Captura todas as marcas únicas dos produtos
    const marcasUnicas = [...new Set(produtos.map(produto => produto.marca))];

    main.innerHTML = `
        <section class="container-produtos">
            <aside class="menu-lateral">
                
                <div class="filtro-bloco">
                    <h3>Filtrar por Preço</h3>
                    <div class="produtos-filtro-preco">
                        <input type="range" id="filtroPreco" min="0" max="2500" step="50" value="2500">
                        <span>Até R$ <span id="valorPreco">1000</span></span>
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
                <p id="contador-produtos" class="contador-produtos"></p> <!-- Contador de produtos -->
                <div class="produtos" id="lista-produtosEmDestaque"></div>
            </section>
        </section>
    `;

    const listaProdutosEmDestaque = document.getElementById("lista-produtosEmDestaque");
    const filtroPreco = document.getElementById("filtroPreco");
    const valorPreco = document.getElementById("valorPreco");
    const filtroMarca = document.getElementById("filtroMarca");
    const filtroOrdenacao = document.getElementById("filtro-ordenacao");
    const botaoLimpar = document.getElementById("limparFiltros");
    const contadorProdutos = document.getElementById("contador-produtos");
    let categoriaAtiva = "todos";
    let marcaAtiva = "todas";

    renderizarProdutos("todos", listaProdutosEmDestaque, produtos, adicionarAoCarrinho);
    atualizarContador(produtos.length); // Atualiza a contagem inicial

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

    botaoLimpar.addEventListener('click', () => {
        filtroPreco.value = 2500;
        valorPreco.textContent = 2500;
        filtroMarca.value = "todas";
        filtroOrdenacao.value = "padrao";
        categoriaAtiva = "todos";
        marcaAtiva = "todas";

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
            return dentroCategoria && dentroPreco && dentroMarca;
        });

        if (filtroOrdenacao.value === "menor-preco") {
            produtosFiltrados.sort((a, b) => a.preco - b.preco);
        } else if (filtroOrdenacao.value === "maior-preco") {
            produtosFiltrados.sort((a, b) => b.preco - a.preco);
        }

        renderizarProdutos(categoriaAtiva, listaProdutosEmDestaque, produtosFiltrados, adicionarAoCarrinho);
        atualizarContador(produtosFiltrados.length); // Atualiza o contador
    }

    function atualizarContador(quantidade) {
        contadorProdutos.textContent = `${quantidade} produto(s) encontrado(s)`;
    }
}
