// Carrinho.js

// Função para renderizar o carrinho
export function renderCarrinho() {
  const main = document.querySelector('main');

  main.innerHTML = `
    <h1>Carrinho de Compras</h1>
    <div id="carrinho-container"></div>
    <a href="#" id="voltar-home">Voltar para Home</a>
  `;

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoContainer = document.getElementById('carrinho-container');

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = 'Seu carrinho está vazio!';
    return;
  }

  carrinho.forEach(produto => {
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto-carrinho');
    produtoDiv.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
      <p class="produto-nome">${produto.nome}</p>
      <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
      <button class="remover-btn" data-id="${produto.id}">Remover</button>
    `;
    carrinhoContainer.appendChild(produtoDiv);
  });

  // Adicionar eventos de clique aos botões de remoção
  carrinhoContainer.querySelectorAll('.remover-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); // Evitar comportamento padrão
      const id = this.getAttribute('data-id');
      if (id) {
        removerDoCarrinho(id);
        renderCarrinho(); // Atualiza a tela após remover
      }
    });
  });

  // Calcular total
  let total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
  const totalDiv = document.createElement('div');
  totalDiv.classList.add('total');
  totalDiv.innerHTML = `Total: R$ ${total.toFixed(2)}`;
  carrinhoContainer.appendChild(totalDiv);

  // Voltar para Home
  document.getElementById('voltar-home').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
  });
}

// Função para adicionar item ao carrinho
export function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  // Garantir que o produto tenha um ID único
  const id = String(produto.id || Date.now()); // Usar timestamp se o ID não existir
  carrinho.push({ ...produto, id });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert('Produto adicionado ao carrinho!');
}

// Função para remover item do carrinho
export function removerDoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const novoCarrinho = carrinho.filter(produto => String(produto.id) !== String(id));
  localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
}