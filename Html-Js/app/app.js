let contas = [];

// Quando a página carregar
window.onload = function () {
    carregarContas();
    verificarProtecao();
};

// Protege a página inicial
function verificarProtecao() {
    if (window.location.pathname.endsWith("index.html")) {
        let userLogado = sessionStorage.getItem("logado");
        if (!userLogado) {
            window.location.href = "./pages/login.html";
        }
    }
}

// Eventos de cadastro
let formularioCadastro = document.getElementById("formularioCadastro");
if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", criarConta);
}

// Eventos de login
let formularioLogin = document.getElementById("formularioLogin");
if (formularioLogin) {
    formularioLogin.addEventListener("submit", logar);
}

// Botão logout
let btnLogOut = document.getElementById("logout");
if (btnLogOut) {
    btnLogOut.addEventListener("click", logOut);
}

// Criar conta
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

// Salvar contas
function salvarConta() {
    localStorage.setItem("contas", JSON.stringify(contas));
}

// Carregar contas
function carregarContas() {
    let contasSalvas = localStorage.getItem("contas");
    if (contasSalvas) {
        contas = JSON.parse(contasSalvas);
    }
}

// Login
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

// Logout
function logOut() {
    sessionStorage.removeItem("logado");
    window.location.href = "./pages/login.html";
}
