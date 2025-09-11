let usuarioLogado
let modoEdicao = false

const feedExemplo = [
  {
    username: "Maria Silva",
    posicao: "Atacante",
    idade: 22,
    cidade: "São Paulo",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    username: "Juliana Souza",
    posicao: "Zagueira",
    idade: 25,
    cidade: "Rio de Janeiro",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    username: "Ana Costa",
    posicao: "Meio-campo",
    idade: 20,
    cidade: "Belo Horizonte",
    foto: "https://randomuser.me/api/portraits/women/12.jpg",
  },
]

window.onload = () => {
  usuarioLogado = JSON.parse(localStorage.getItem("logado"))

  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar o perfil!")
    window.location.href = "login.html"
    return
  }

  mostrarPerfil()
  carregarFeed()

  document.getElementById("toggleSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("hidden")
  })
}

function mostrarPerfil() {
  document.getElementById("perfilNome").innerText = usuarioLogado.username
  document.getElementById("perfilEmail").innerText = usuarioLogado.email
  document.getElementById("perfilIdade").innerText = usuarioLogado.idade
  document.getElementById("perfilPosicao").innerText = usuarioLogado.posicao
  document.getElementById("perfilCidade").innerText = usuarioLogado.cidade

  if (usuarioLogado.foto) {
    document.getElementById("perfilFoto").src = usuarioLogado.foto
  }
}

function carregarFeed() {
  const contas = JSON.parse(localStorage.getItem("contas")) || []
  const container = document.getElementById("cardsFeed")
  container.innerHTML = ""

  const outrasJogadoras = contas.filter(
    (c) => c.email !== usuarioLogado.email && c.username !== usuarioLogado.username && c.username !== "",
  )

  const todasJogadoras = [...feedExemplo, ...outrasJogadoras]

  todasJogadoras.forEach((c) => {
    const card = document.createElement("div")
    card.classList.add("card-jogadora")

    card.innerHTML = `
      <img src="${c.foto || "../assets/default.png"}" alt="Foto">
      <h3>${c.username}</h3>
      <p><strong>Posição:</strong> ${c.posicao}</p>
      <p><strong>Idade:</strong> ${c.idade || "-"} anos</p>
      <p><strong>Cidade:</strong> ${c.cidade}</p>
    `

    container.appendChild(card)
  })

  if (todasJogadoras.length === 0) {
    container.innerHTML = "<p>Nenhuma jogadora encontrada no momento.</p>"
  }
}

function entrarEdicao() {
  modoEdicao = true

  document.getElementById("perfilNome").innerHTML =
    `<input type="text" id="editNome" value="${usuarioLogado.username}">`
  document.getElementById("perfilEmail").innerHTML =
    `<input type="email" id="editEmail" value="${usuarioLogado.email}">`
  document.getElementById("perfilIdade").innerHTML =
    `<input type="number" id="editIdade" value="${usuarioLogado.idade}">`
  document.getElementById("perfilPosicao").innerHTML =
    `<input type="text" id="editPosicao" value="${usuarioLogado.posicao}">`
  document.getElementById("perfilCidade").innerHTML =
    `<input type="text" id="editCidade" value="${usuarioLogado.cidade}">`

  document.getElementById("btnEditar").style.display = "none"
  document.getElementById("btnSalvar").style.display = "block"
  document.getElementById("btnCancelar").style.display = "block"
}

function salvarEdicao() {
  if (!modoEdicao) return

  usuarioLogado.username = document.getElementById("editNome").value
  usuarioLogado.email = document.getElementById("editEmail").value
  usuarioLogado.idade = document.getElementById("editIdade").value
  usuarioLogado.posicao = document.getElementById("editPosicao").value
  usuarioLogado.cidade = document.getElementById("editCidade").value

  const contas = JSON.parse(localStorage.getItem("contas")) || []
  const indice = contas.findIndex((c) => c.email === usuarioLogado.email)
  if (indice !== -1) {
    contas[indice] = usuarioLogado
    localStorage.setItem("contas", JSON.stringify(contas))
  }

  localStorage.setItem("logado", JSON.stringify(usuarioLogado))

  modoEdicao = false
  mostrarPerfil()
  carregarFeed()

  document.getElementById("btnEditar").style.display = "block"
  document.getElementById("btnSalvar").style.display = "none"
  document.getElementById("btnCancelar").style.display = "none"

  alert("Perfil atualizado com sucesso!")
}

function cancelarEdicao() {
  modoEdicao = false
  mostrarPerfil()

  document.getElementById("btnEditar").style.display = "block"
  document.getElementById("btnSalvar").style.display = "none"
  document.getElementById("btnCancelar").style.display = "none"
}

function logout() {
  localStorage.removeItem("logado")
  window.location.href = "login.html"
}
