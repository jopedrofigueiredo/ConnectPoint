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
];

window.onload = function () {
  carregarContas();

  let formCadastro = document.getElementById("formularioCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", criarConta);
  }


  let formLogin = document.getElementById("formularioLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", login);
  }
};


function criarConta(e) {
  e.preventDefault();

  let username = document.getElementById('contaUsername').value;
  let email = document.getElementById('contaEmail').value;
  let senha = document.getElementById('contaSenha').value;
  let idade = document.getElementById('contaIdade').value;
  let posicao = document.getElementById('contaPosicao').value;
  let cidade = document.getElementById('contaCidade').value;
  let foto = document.getElementById('contaFoto').value;


  let existe = contas.find(c => c.email === email);
  if (existe) {
    alert("E-mail já cadastrado!");
    return;
  }

  let conta = { username, email, senha, idade, posicao, cidade, foto };

  contas.unshift(conta);
  salvarConta();
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html"; 
}


function login(e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let senha = document.getElementById("loginSenha").value;

  let usuario = contas.find(c => c.email === email && c.senha === senha);

  if (usuario) {
    localStorage.setItem("logado", JSON.stringify(usuario));
    alert("Login realizado com sucesso!");
    window.location.href = "perfil.html";
  } else {
    alert("Email ou senha incorretos!");
  }
}


function logout() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
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