let contas = []

window.onload = () => {
  carregarContas()

  const formCadastro = document.getElementById("formularioCadastro")
  if (formCadastro) {
    formCadastro.addEventListener("submit", criarConta)
  }

  const formLogin = document.getElementById("formularioLogin")
  if (formLogin) {
    formLogin.addEventListener("submit", login)
  }
}

function criarConta(e) {
  e.preventDefault()

  const username = document.getElementById("contaUsername").value
  const email = document.getElementById("contaEmail").value
  const senha = document.getElementById("contaSenha").value
  const idade = document.getElementById("contaIdade").value
  const posicao = document.getElementById("contaPosicao").value
  const cidade = document.getElementById("contaCidade").value
  const foto = document.getElementById("contaFoto").value

  const existe = contas.find((c) => c.email === email)
  if (existe) {
    alert("E-mail já cadastrado!")
    return
  }

  const conta = { username, email, senha, idade, posicao, cidade, foto }

  contas.push(conta)
  salvarConta()
  alert("Cadastro realizado com sucesso!")
  window.location.href = "login.html"
}

function login(e) {
  e.preventDefault()

  const email = document.getElementById("loginEmail").value
  const senha = document.getElementById("loginSenha").value

  const usuario = contas.find((c) => c.email === email && c.senha === senha)

  if (usuario) {
    localStorage.setItem("logado", JSON.stringify(usuario))
    alert("Login realizado com sucesso!")
    window.location.href = "perfil.html"
  } else {
    alert("Email ou senha incorretos!")
  }
}

function logout() {
  localStorage.removeItem("logado")
  window.location.href = "login.html"
}

function salvarConta() {
  localStorage.setItem("contas", JSON.stringify(contas))
}

function carregarContas() {
  const contasSalvas = localStorage.getItem("contas")
  if (contasSalvas) {
    contas = JSON.parse(contasSalvas)
  }
}
