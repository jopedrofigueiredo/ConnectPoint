let contas = [];


window.onload = function () {
    carregarContas();
    verificarProtecao();
};


function verificarProtecao() {
    if (window.location.pathname.endsWith("index.html")) {
        let userLogado = sessionStorage.getItem("logado");
        if (!userLogado) {
            window.location.href = "./pages/login.html";
        }
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


function criarConta(e) {
    e.preventDefault();

    let conta = {
        username: document.getElementById('contaUsername').value,
        email: document.getElementById('contaEmail').value,
        senha: document.getElementById('contaSenha').value,
        idade: document.getElementById('contaIdade').value,
        posicao: document.getElementById('contaPosicao').value,
        cidade: document.getElementById('contaCidade').value,
        foto: document.getElementById('contaFoto').value,
        idConta: (contas.length + 1)
    };

    contas.unshift(conta);
    salvarConta();

    document.getElementById("formularioCadastro").reset();
    alert("Cadastro completo!");
    window.location.href = "./login.html";
}


function salvarConta() {
    localStorage.setItem("contas", JSON.stringify(contas));
}


function carregarContas() {
    let contasSalvas = localStorage.getItem("contas");
    if (contasSalvas) {
        contas = JSON.parse(contasSalvas);
    }
}

function logar(e) {
    e.preventDefault();

    let loginUsuario = document.getElementById("loginUsuario").value;
    let loginSenha = document.getElementById("loginSenha").value;

    let user = contas.find(c =>
        (c.email === loginUsuario || c.username === loginUsuario) &&
        c.senha === loginSenha
    );

    if (user) {
        sessionStorage.setItem("logado", JSON.stringify(user));
        alert("Acesso liberado!");
        window.location.href = "perfil.html";
    } else {
        alert("Usuário ou senha inválidos.");
    }
}

function logOut() {
    sessionStorage.removeItem("logado");
    window.location.href = "./pages/login.html";
}
