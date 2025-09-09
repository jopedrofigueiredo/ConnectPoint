let contas = [
    {
        username: "",
        email: "",
        senha: "",
        idade: "",
        posicao: "",
        cidade: "",
        foto: ""
    }
]

window.onload = function () {
    carregarContas();
}

document.getElementById("formularioCadastro").addEventListener("submit", criarConta);

// Criar conta
function criarConta(e) {
    e.preventDefault();

    let username = document.getElementById('contaUsername').value;
    let email = document.getElementById('contaEmail').value;
    let senha = document.getElementById('contaSenha').value;
    let idade = document.getElementById('contaIdade').value;
    let posicao = document.getElementById('contaPosicao').value;
    let cidade = document.getElementById('contaCidade').value;
    let foto = document.getElementById('contaFoto').value;
    
    let conta = {
        username: username,
        email: email,
        senha: senha,
        idade: idade,
        posicao: posicao,
        cidade: cidade,
        foto: foto
    };

    contas.unshift(conta);
    salvarConta();
    console.log(contas);

    document.getElementById("formularioCadastro").reset();
}


// Salvar 
function salvarConta() {
    localStorage.setItem("contas", JSON.stringify(contas));
}

// Carregar
function carregarContas() {
    let contasSalvas = localStorage.getItem("contas");
    if (contasSalvas) {
        contas = JSON.parse(contasSalvas)
    }
}