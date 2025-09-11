let contas = []

window.onload = function () {
    carregarContas();
}

if (window.location.pathname.endsWith("index.html")) {
    let userLogado = sessionStorage.getItem("logado");
    if (!userLogado) {
        window.location.href = "/html-js/pages/login.html";
    }
}

let formularioCadastro = document.getElementById("formularioCadastro");
    if (formularioCadastro) {
      formularioCadastro.addEventListener("submit", criarConta);
    }

let formularioLogin = document.getElementById("formularioLogin");
    if (formularioLogin) {
      formularioLogin.addEventListener("submit", logar);
    }


let btnLogOut = document.getElementById("logout");
    if (btnLogOut) {
      btnLogOut.addEventListener("click", logOut);
    }

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
        foto: foto,
        idConta: (contas.length +1)
    };

    contas.unshift(conta);
    salvarConta();
    console.log(contas);

    document.getElementById("formularioCadastro").reset();
    alert("Cadastro completo!");
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
    console.log(loginUsuario);
    let loginSenha = document.getElementById("loginSenha").value;
    console.log(loginSenha);

    //let contas = JSON.parse(localStorage.getItem("contas")) || [];

    let user = contas.find(c => (c.email === loginUsuario || c.username === loginUsuario) && c.senha === loginSenha);

    if (user) {
        sessionStorage.setItem("logado", JSON.stringify(user));
        alert("acesso liberado");
        window.location.href = "../index.html";
    } else {
        alert("Usuário inválido");
    }
}

function logOut() {
    sessionStorage.removeItem("logado");
    window.location.href = "./pages/login.html"
}