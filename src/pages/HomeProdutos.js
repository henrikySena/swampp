import { renderizarProdutos } from "../components/produto/renderProduto.js";
import { produtos } from "../../data/Produtos.js";
import { adicionarAoCarrinho } from "./Carrinho.js";

export function renderProdutos() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="container-produtos">
            <aside class="menu-lateral">
                <h3>Filtrar por Categoria</h3>
                <nav class="produtos-filtros-categorias">
                    <a class="produtos-filtro-btn ativo" data-categoria="todos">Todos</a>
                    <a class="produtos-filtro-btn" data-categoria="roupa">Roupas</a>
                    <a class="produtos-filtro-btn" data-categoria="equipamento">Equipamentos</a>
                    <a class="produtos-filtro-btn" data-categoria="acessorio">Acessórios</a>
                </nav>
            </aside>

            <section class="produtos-destaques">
                <h2 class="titulo-destaques">Produtos</h2>
                <div class="produtos" id="lista-produtosEmDestaque"></div>
            </section>
        </section>
    `;

    const listaProdutosEmDestaque = document.getElementById("lista-produtosEmDestaque");

    renderizarProdutos("todos", listaProdutosEmDestaque, produtos, adicionarAoCarrinho);

    const botoesFiltro = document.querySelectorAll('.produtos-filtro-btn');
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
            botao.classList.add('ativo');
            const categoria = botao.getAttribute('data-categoria');
            renderizarProdutos(categoria, listaProdutosEmDestaque, produtos, adicionarAoCarrinho);
        });
    });
}
