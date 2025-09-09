let contas = [
    {}
]

window.onload = function () {
    carregarContas();
}

document.getElementById("formularioCadastro").addEventListener("submit", criarConta);
document.getElementById("btn-logar").addEventListener("submit", logar);

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

function logar(e) {
    e.preventDefault();

    let loginUsuario = document.getElementById("loginUsuario").value;
    let loginSenha = document.getElementById("loginSenha").value;

    let contas = JSON.parse(localStorage.getItem("contas")) || [];

    let conta = contas.find(c => (c.email === loginUsuario || c.username === loginUsuario ) && c.senha === loginSenha);

    if (conta) {
        alert("login realizado");
        localStorage.setItem("loggedUser", JSON.stringify(user));

        window.location.href = "index.html";
    } else {
        alert("Usuário inválido");
    }
}