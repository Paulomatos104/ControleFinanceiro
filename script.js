document.addEventListener('DOMContentLoaded', () => {
  const dadosExtrato = {
    saldo: 2500.00,
    transacoes: [
      { tipo: 'venda', descricao: 'VENDA - celular', valor: 1500.00 },
      { tipo: 'venda', descricao: 'VENDA - notebook', valor: 3000.00 },
      { tipo: 'compra', descricao: 'COMPRA - fone de ouvido', valor: 200.00 },
      { tipo: 'compra', descricao: 'COMPRA - monitor', valor: 800.00 },
    ]
  };

  const saldoElement = document.getElementById('saldo-conta');
  const listaTransacoes = document.getElementById('lista-transacoes');
  const form = document.getElementById('form-transacao');

  function atualizarSaldo() {
    saldoElement.textContent = `Saldo: ${dadosExtrato.saldo.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL'
    })}`;
  }

  function renderizarTransacoes() {
    listaTransacoes.innerHTML = '';

    dadosExtrato.transacoes.forEach(transacao => {
      const itemLista = document.createElement('li');
      itemLista.classList.add('transacao');

      if (Math.abs(transacao.valor) >= 5000) {
        itemLista.classList.add('destaque');
      }

      const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(transacao.valor);

      itemLista.innerHTML = `
        <div class="transacao-info">
          <span>${transacao.descricao}</span>
          <small>${transacao.tipo.toUpperCase()}</small>
        </div>
        <span class="transacao-valor ${transacao.tipo === 'compra' ? 'negativo' : ''}">
          ${valorFormatado}
        </span>
      `;

      listaTransacoes.appendChild(itemLista);
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value.trim();
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    if (!descricao || isNaN(valor) || valor <= 0) {
      alert('Preencha os campos corretamente.');
      return;
    }

    const novaTransacao = { tipo, descricao, valor };

    dadosExtrato.transacoes.push(novaTransacao);
    dadosExtrato.saldo += tipo === 'venda' ? valor : -valor;

    atualizarSaldo();
    renderizarTransacoes();

    form.reset();
  });

  atualizarSaldo();
  renderizarTransacoes();
});
