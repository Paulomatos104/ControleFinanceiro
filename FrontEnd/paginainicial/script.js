let dadosExtrato = JSON.parse(localStorage.getItem("financeiro")) || {
    salario: 0,
    saldo: 0,
    transacoes: []
};

// ELEMENTOS
const saldoEl = document.getElementById("saldo");
const salarioEl = document.getElementById("salario");
const listaTransacoes = document.getElementById("listaTransacoes");
const form = document.getElementById("formTransacao");

const editarBox = document.getElementById("editarSalarioBox");
const btnEditarSalario = document.getElementById("btn-editar-salario");
const novoSalarioInput = document.getElementById("novoSalario");
const salvarSalarioBtn = document.getElementById("salvarSalario");

// Atualizar valores
function atualizarSaldo() {
    const totalDespesas = dadosExtrato.transacoes.reduce((acc, t) => acc + t.valor, 0);
    dadosExtrato.saldo = dadosExtrato.salario - totalDespesas;

    salarioEl.textContent = `Salário Mensal: R$ ${dadosExtrato.salario.toFixed(2)}`;
    saldoEl.textContent = `Saldo: R$ ${dadosExtrato.saldo.toFixed(2)}`;
}

function atualizarExtrato() {
    listaTransacoes.innerHTML = "";

    dadosExtrato.transacoes.forEach((t, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${t.descricao}</strong><br>
                <small>${t.formaPagamento.toUpperCase()}</small>
            </div>

            <div style="display:flex; gap:10px; align-items:center;">
                <span style="color:red;">- R$ ${t.valor.toFixed(2)}</span>
                <button class="btn-editar" data-index="${index}">✏️</button>
                <button class="btn-excluir" data-index="${index}">🗑️</button>
            </div>
        `;

        listaTransacoes.appendChild(li);
    });

    // Eventos de editar
    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => editarTransacao(btn.dataset.index));
    });

    // Eventos de excluir
    document.querySelectorAll(".btn-excluir").forEach(btn => {
        btn.addEventListener("click", () => excluirTransacao(btn.dataset.index));
    });
}

function excluirTransacao(index) {
    dadosExtrato.transacoes.splice(index, 1);
    salvarLocal();
    atualizarExtrato();
    atualizarSaldo();
}

function editarTransacao(index) {
    const novaDesc = prompt("Nova descrição:", dadosExtrato.transacoes[index].descricao);
    const novoValor = parseFloat(prompt("Novo valor:", dadosExtrato.transacoes[index].valor));

    if (novaDesc && !isNaN(novoValor)) {
        dadosExtrato.transacoes[index].descricao = novaDesc;
        dadosExtrato.transacoes[index].valor = novoValor;

        salvarLocal();
        atualizarExtrato();
        atualizarSaldo();
    }
}

// Salvar no localStorage
function salvarLocal() {
    localStorage.setItem("financeiro", JSON.stringify(dadosExtrato));
}

// Adicionar despesa
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const formaPagamento = document.getElementById("formaPagamento").value;

    if (isNaN(valor) || valor <= 0) return alert("Digite um valor válido!");

    dadosExtrato.transacoes.push({ descricao, valor, formaPagamento });

    salvarLocal();
    atualizarExtrato();
    atualizarSaldo();

    form.reset();
});

// Abrir caixa de edição de salário
btnEditarSalario.addEventListener("click", () => {
    editarBox.style.display = editarBox.style.display === "block" ? "none" : "block";
});

// Salvar novo salário
salvarSalarioBtn.addEventListener("click", () => {
    const novoSalario = parseFloat(novoSalarioInput.value);

    if (isNaN(novoSalario) || novoSalario <= 0) return alert("Salário inválido!");
    
    dadosExtrato.salario = novoSalario;

    salvarLocal();
    atualizarSaldo();

    novoSalarioInput.value = "";
    editarBox.style.display = "none";
});

// Inicializar
atualizarExtrato();
atualizarSaldo();
