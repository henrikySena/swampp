import { renderizarProdutos } from "../components/produto/renderProduto.js";
import { produtos } from "../../data/Produtos.js";
import { adicionarAoCarrinho } from "./Carrinho.js";

export function renderProdutos() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="destaques">
          <h2 class="titulo-destaques">Produtos</h2>
          <div class="filtros-categorias">
              <a class="filtro-btn ativo" data-categoria="todos">Todos</a>
              <a class="filtro-btn" data-categoria="roupa">Roupas</a>
              <a class="filtro-btn" data-categoria="equipamento">Equipamentos</a>
              <a class="filtro-btn" data-categoria="acessorio">Acessórios</a>
          </div>
          <div class="produtos" id="lista-produtosEmDestaque"></div>
        </section>
    `;

    const listaProdutosEmDestaque = document.getElementById("lista-produtosEmDestaque");

    // Renderiza os produtos usando os dados de Produtos.js
    renderizarProdutos("todos", listaProdutosEmDestaque, produtos, adicionarAoCarrinho);

    // Configura os filtros para atualizar a renderização de acordo com a categoria selecionada
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
            botao.classList.add('ativo');
            const categoria = botao.getAttribute('data-categoria');
            renderizarProdutos(categoria, listaProdutosEmDestaque, produtos, adicionarAoCarrinho);
        });
    });
}