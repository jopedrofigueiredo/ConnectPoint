let todasJogadoras = []
let jogadorasFiltradas = []


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
  {
    username: "Carla Santos",
    posicao: "Goleira",
    idade: 28,
    cidade: "Porto Alegre",
    foto: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    username: "Fernanda Lima",
    posicao: "Lateral",
    idade: 24,
    cidade: "Recife",
    foto: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    username: "Patrícia Oliveira",
    posicao: "Atacante",
    idade: 26,
    cidade: "Salvador",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
  },
]

window.onload = () => {
  const usuarioLogado = JSON.parse(sessionStorage.getItem("logado"))

  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar o feed!")
    window.location.href = "login.html"
    return
  }

  carregarFeed()
}

function carregarFeed() {
  const contas = JSON.parse(localStorage.getItem("contas")) || []
  const usuarioLogado = JSON.parse(sessionStorage.getItem("logado"))

  const outrasJogadoras = contas.filter(
    (c) => c.email !== usuarioLogado.email && c.username !== usuarioLogado.username && c.username !== "" && c.username,
  )

  todasJogadoras = [...feedExemplo, ...outrasJogadoras]
  jogadorasFiltradas = [...todasJogadoras]

  renderizarFeed()
}

function renderizarFeed() {
  const container = document.getElementById("feedContainer")
  const emptyState = document.getElementById("emptyState")

  container.innerHTML = ""

  if (jogadorasFiltradas.length === 0) {
    container.style.display = "none"
    emptyState.style.display = "block"
    return
  }

  container.style.display = "grid"
  emptyState.style.display = "none"

  jogadorasFiltradas.forEach((jogadora) => {
    const card = document.createElement("div")
    card.classList.add("player-card")

    card.innerHTML = `
      <div class="player-header">
        <img src="${jogadora.foto || "../assets/usuario sem foto.jpg"}" 
             alt="Foto de ${jogadora.username}" 
             class="player-avatar">
        <div class="player-info">
          <h3>${jogadora.username}</h3>
          <span class="player-position">${jogadora.posicao}</span>
        </div>
      </div>
      <div class="player-details">
        <div class="detail-item">
          <div class="detail-label">Idade</div>
          <div class="detail-value">${jogadora.idade || "-"} anos</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Cidade</div>
          <div class="detail-value">${jogadora.cidade}</div>
        </div>
      </div>
    `

    card.style.cursor = "pointer"
    card.addEventListener("click", () => {
      sessionStorage.setItem("perfilSelecionado", JSON.stringify(jogadora))
      window.open("perfil.html", "_blank")
    })

    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    container.appendChild(card)

    setTimeout(() => {
      card.style.transition = "all 0.3s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, 100)
  })
}

card.addEventListener("click", () => {
  sessionStorage.setItem("perfilSelecionado", JSON.stringify(jogadora))
  window.open("perfil.html", "_blank")
})

function filtrarJogadoras() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim()

  if (searchTerm === "") {
    jogadorasFiltradas = [...todasJogadoras]
  } else {
    jogadorasFiltradas = todasJogadoras.filter(
      (jogadora) =>
        jogadora.username.toLowerCase().includes(searchTerm) ||
        jogadora.posicao.toLowerCase().includes(searchTerm) ||
        jogadora.cidade.toLowerCase().includes(searchTerm),
    )
  }

  renderizarFeed()
}

function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    sessionStorage.removeItem("logado")
    window.location.href = "login.html"
  }
}

