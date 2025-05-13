export function renderizarProdutos(categoriaSelecionada = "todos", listaProdutosEmDestaque, produtosEmDestaque, adicionarAoCarrinho) {
    listaProdutosEmDestaque.innerHTML = "";

    // Filtragem dos itens
    const produtosFiltrados = categoriaSelecionada === "todos"
      ? produtosEmDestaque
      : produtosEmDestaque.filter(prod => 
          Array.isArray(prod.categoria) 
            ? prod.categoria.includes(categoriaSelecionada) 
            : prod.categoria === categoriaSelecionada
        );

    // Renderização dos produtos filtrados
    produtosFiltrados.forEach((produto, index) => {
      const div = document.createElement('div');
      div.classList.add('produto');

      let imagemAtual = 0;
      let variacaoAtual = produto.variacoes && produto.variacoes.length > 0 ? produto.variacoes[0] : null;

      // Contêiner para imagem e setas
      const imagemContainer = document.createElement('div');
      imagemContainer.classList.add('produto-imagem-container');

      // Imagem principal
      const imagemPrincipal = document.createElement('img');
      imagemPrincipal.classList.add('produto-img');
      imagemPrincipal.alt = produto.nome;

      // Define a imagem inicial
      const imagensDisponiveis = variacaoAtual ? variacaoAtual.imagens : produto.imagens;
      imagemPrincipal.src = imagensDisponiveis[0];

      // Setas de navegação
      const setaEsq = document.createElement('button');
      setaEsq.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
      setaEsq.classList.add('product-arrow', 'arrow-left');

      const setaDir = document.createElement('button');
      setaDir.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
      setaDir.classList.add('product-arrow', 'arrow-right');

      // Lógica das setas
      setaEsq.addEventListener('click', (e) => {
        e.stopPropagation();
        const imagens = variacaoAtual ? variacaoAtual.imagens : produto.imagens;
        imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
        imagemPrincipal.src = imagens[imagemAtual];
      });

      setaDir.addEventListener('click', (e) => {
        e.stopPropagation();
        const imagens = variacaoAtual ? variacaoAtual.imagens : produto.imagens;
        imagemAtual = (imagemAtual + 1) % imagens.length;
        imagemPrincipal.src = imagens[imagemAtual];
      });

      // Monta o contêiner de imagem
      imagemContainer.appendChild(imagemPrincipal);
      imagemContainer.appendChild(setaEsq);
      imagemContainer.appendChild(setaDir);
      div.appendChild(imagemContainer);

      // Variações de cor (se existirem)
      if (produto.variacoes && produto.variacoes.length > 0) {
        const variacoesWrapper = document.createElement('div');
        variacoesWrapper.classList.add('variacoes-wrapper');
      
        const variacoesDiv = document.createElement('div');
        variacoesDiv.classList.add('produto-variacoes');
        variacoesDiv.style.display = 'none';
      
        produto.variacoes.forEach((variacao, idx) => {
          const corBolinha = document.createElement('span');
          corBolinha.classList.add('cor-bolinha');
          if (idx === 0) corBolinha.classList.add('ativa');
          corBolinha.style.backgroundColor = variacao.corHex;
          corBolinha.title = variacao.cor;
      
          corBolinha.addEventListener('click', (e) => {
            e.stopPropagation();
            variacaoAtual = variacao;
            imagemAtual = 0;
            imagemPrincipal.src = variacao.imagens[imagemAtual];
      
            const todasBolinhas = variacoesDiv.querySelectorAll('.cor-bolinha');
            todasBolinhas.forEach(b => b.classList.remove('ativa'));
            corBolinha.classList.add('ativa');
          });
      
          variacoesDiv.appendChild(corBolinha);
        });
      
        variacoesWrapper.appendChild(variacoesDiv);
        div.appendChild(variacoesWrapper);
      
        div.addEventListener('mouseenter', () => {
          variacoesDiv.style.display = 'flex';
        });
      
        div.addEventListener('mouseleave', () => {
          variacoesDiv.style.display = 'none';
        });
      }

      // Nome, marca, preço
      const marca = document.createElement('p');
      marca.classList.add('produto-marca');
      marca.textContent = produto.marca;

      const nome = document.createElement('p');
      nome.classList.add('produto-nome');
      nome.textContent = produto.nome;

      const preco = document.createElement('p');
      preco.classList.add('produto-preco');
      preco.textContent = produto.preco.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'});

      // Montagem final
      div.appendChild(marca);
      div.appendChild(nome);
      div.appendChild(preco);

      // Botão "Adicionar ao Carrinho"
      const botaoCarrinho = document.createElement('button');
      botaoCarrinho.textContent = 'Adicionar ao Carrinho';
      botaoCarrinho.classList.add('botao-carrinho');

      botaoCarrinho.addEventListener('click', (e) => {
        e.stopPropagation();
        const produtoParaCarrinho = {
          nome: produto.nome,
          preco: produto.preco,
          imagem: variacaoAtual ? variacaoAtual.imagens[0] : produto.imagens[0],
        };
        adicionarAoCarrinho(produtoParaCarrinho);
      });

      //div.appendChild(botaoCarrinho);

      // Link para a página de visualização do produto com o índice
      div.addEventListener('click', (e) => {
        if (e.target.closest('.product-arrow, .cor-bolinha, .botao-carrinho')) return;
        window.location.hash = `#produto?id=${produto.id}`;
      });

      listaProdutosEmDestaque.appendChild(div);
    });
}