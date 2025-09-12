let usuarioLogado
let modoEdicao = false

window.onload = () => {
  usuarioLogado = JSON.parse(localStorage.getItem("logado"))

  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar o perfil!")
    window.location.href = "login.html"
    return
  }

  mostrarPerfil()
}

function mostrarPerfil() {
  document.getElementById("perfilNome").innerText = usuarioLogado.username || "Nome não informado"
  document.getElementById("perfilEmail").innerText = usuarioLogado.email || "Email não informado"
  document.getElementById("perfilIdade").innerText = usuarioLogado.idade || "Não informado"
  document.getElementById("perfilPosicao").innerText = usuarioLogado.posicao || "Não informado"
  document.getElementById("perfilCidade").innerText = usuarioLogado.cidade || "Não informado"

  if (usuarioLogado.foto) {
    document.getElementById("perfilFoto").src = usuarioLogado.foto
  }
}

function entrarEdicao() {
  modoEdicao = true

  document.getElementById("perfilNome").innerHTML =
    `<input type="text" id="editNome" value="${usuarioLogado.username || ""}" placeholder="Seu nome">`
  document.getElementById("perfilEmail").innerHTML =
    `<input type="email" id="editEmail" value="${usuarioLogado.email || ""}" placeholder="Seu email">`
  document.getElementById("perfilIdade").innerHTML =
    `<input type="number" id="editIdade" value="${usuarioLogado.idade || ""}" placeholder="Sua idade">`
  document.getElementById("perfilPosicao").innerHTML = `<select id="editPosicao">
      <option value="Goleira" ${usuarioLogado.posicao === "Goleira" ? "selected" : ""}>Goleira</option>
      <option value="Zagueira" ${usuarioLogado.posicao === "Zagueira" ? "selected" : ""}>Zagueira</option>
      <option value="Lateral" ${usuarioLogado.posicao === "Lateral" ? "selected" : ""}>Lateral</option>
      <option value="Meio-campo" ${usuarioLogado.posicao === "Meio-campo" ? "selected" : ""}>Meio-campo</option>
      <option value="Atacante" ${usuarioLogado.posicao === "Atacante" ? "selected" : ""}>Atacante</option>
    </select>`
  document.getElementById("perfilCidade").innerHTML =
    `<input type="text" id="editCidade" value="${usuarioLogado.cidade || ""}" placeholder="Sua cidade">`

  document.getElementById("btnEditar").style.display = "none"
  document.getElementById("btnSalvar").style.display = "inline-block"
  document.getElementById("btnCancelar").style.display = "inline-block"
}

function salvarEdicao() {
  if (!modoEdicao) return

  const novoNome = document.getElementById("editNome").value.trim()
  const novoEmail = document.getElementById("editEmail").value.trim()
  const novaIdade = document.getElementById("editIdade").value
  const novaPosicao = document.getElementById("editPosicao").value
  const novaCidade = document.getElementById("editCidade").value.trim()

  if (!novoNome || !novoEmail || !novaIdade || !novaPosicao || !novaCidade) {
    alert("Por favor, preencha todos os campos!")
    return
  }

  usuarioLogado.username = novoNome
  usuarioLogado.email = novoEmail
  usuarioLogado.idade = novaIdade
  usuarioLogado.posicao = novaPosicao
  usuarioLogado.cidade = novaCidade

  const contas = JSON.parse(localStorage.getItem("contas")) || []
  const indice = contas.findIndex((c) => c.email === usuarioLogado.email)
  if (indice !== -1) {
    contas[indice] = usuarioLogado
    localStorage.setItem("contas", JSON.stringify(contas))
  }

  localStorage.setItem("logado", JSON.stringify(usuarioLogado))

  modoEdicao = false
  mostrarPerfil()

  document.getElementById("btnEditar").style.display = "inline-block"
  document.getElementById("btnSalvar").style.display = "none"
  document.getElementById("btnCancelar").style.display = "none"

  alert("Perfil atualizado com sucesso!")
}

function cancelarEdicao() {
  modoEdicao = false
  mostrarPerfil()

  document.getElementById("btnEditar").style.display = "inline-block"
  document.getElementById("btnSalvar").style.display = "none"
  document.getElementById("btnCancelar").style.display = "none"
}

function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    localStorage.removeItem("logado")
    window.location.href = "login.html"
  }
}
