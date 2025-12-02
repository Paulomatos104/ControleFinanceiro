// Carregar dados ou criar padrão
let dadosExtrato = JSON.parse(localStorage.getItem("financeiro")) || {
    salario: 0,
    saldo: 0,
    transacoes: []
};

// ELEMENTOS
const saldoEl = document.getElementById("saldo");
const listaTransacoes = document.getElementById("listaTransacoes");
const form = document.getElementById("formTransacao");

const modal = document.getElementById("salarioModal");
const btnEditarSalario = document.getElementById("btn-editar-salario");
const novoSalarioInput = document.getElementById("novoSalario");
const salvarSalarioBtn = document.getElementById("salvarSalario");
const cancelarSalarioBtn = document.getElementById("cancelarSalario");

// Atualizar saldo na tela
function exibirSaldo() {
    saldoEl.textContent = `Saldo: R$ ${dadosExtrato.saldo.toFixed(2)}`;
}

// Atualizar lista de transações
function atualizarExtrato() {
    listaTransacoes.innerHTML = "";

    dadosExtrato.transacoes.forEach((t, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${t.descricao}</strong><br>
                <small>${t.formaPagamento.toUpperCase()}</small>
            </div>
            <span style="color:red;">- R$ ${t.valor.toFixed(2)}</span>
        `;
        listaTransacoes.appendChild(li);
    });
}

// Adicionar despesa
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const formaPagamento = document.getElementById("formaPagamento").value;

    if (isNaN(valor) || valor <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    const novaTransacao = {
        descricao,
        valor,
        formaPagamento
    };

    dadosExtrato.transacoes.push(novaTransacao);

    // Recalcular saldo
    const totalDespesas = dadosExtrato.transacoes.reduce((acc, t) => acc + t.valor, 0);
    dadosExtrato.saldo = dadosExtrato.salario - totalDespesas;

    // Salvar
    localStorage.setItem("financeiro", JSON.stringify(dadosExtrato));

    atualizarExtrato();
    exibirSaldo();

    form.reset();
});

// BOTÃO EDITAR SALÁRIO → abre modal
btnEditarSalario.addEventListener("click", () => {
    modal.style.display = "flex";
});

// CANCELAR → fecha modal
cancelarSalarioBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// SALVAR NOVO SALÁRIO
salvarSalarioBtn.addEventListener("click", () => {
    const novoSalario = parseFloat(novoSalarioInput.value);

    if (isNaN(novoSalario) || novoSalario <= 0) {
        alert("Digite um salário válido!");
        return;
    }

    dadosExtrato.salario = novoSalario;

    // Recalcular saldo baseado nas despesas
    const totalDespesas = dadosExtrato.transacoes.reduce((acc, t) => acc + t.valor, 0);
    dadosExtrato.saldo = dadosExtrato.salario - totalDespesas;

    // Salvar
    localStorage.setItem("financeiro", JSON.stringify(dadosExtrato));

    exibirSaldo();
    modal.style.display = "none";
    novoSalarioInput.value = "";
});

// Iniciar interface
atualizarExtrato();
exibirSaldo();
