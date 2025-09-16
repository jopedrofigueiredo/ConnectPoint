let usuarioLogado = null;
let modoEdicao = false;
const FOTO_PADRAO = "../assets/usuario sem foto.jpg";

window.onload = () => {
  const perfilSelecionado = JSON.parse(sessionStorage.getItem("perfilSelecionado"));

  if (perfilSelecionado) {
    sessionStorage.removeItem("perfilSelecionado");
    usuarioLogado = JSON.parse(sessionStorage.getItem("logado")); 
    mostrarPerfil(perfilSelecionado);
  } else {
    usuarioLogado = JSON.parse(sessionStorage.getItem("logado"));

    if (!usuarioLogado) {
      alert("Você precisa estar logado para acessar o perfil!");
      window.location.href = "login.html";
      return;
    }

    mostrarPerfil(usuarioLogado);
  }
};


function mostrarPerfil(perfil = usuarioLogado) {
  document.getElementById("perfilNome").innerText = perfil.username || "Nome não informado";
  document.getElementById("perfilEmail").innerText = perfil.email || "Email não informado";
  document.getElementById("perfilIdade").innerText = perfil.idade || "Não informado";
  document.getElementById("perfilPosicao").innerText = perfil.posicao || "Não informado";
  document.getElementById("perfilCidade").innerText = perfil.cidade || "Não informado";

  const fotoElement = document.getElementById("perfilFoto");
  if (perfil.foto && perfil.foto.trim() !== "") {
    fotoElement.src = perfil.foto;
  } else {
    fotoElement.src = FOTO_PADRAO;
  }

  const btnEditar = document.getElementById("btnEditar");
  const btnSalvar = document.getElementById("btnSalvar");
  const btnCancelar = document.getElementById("btnCancelar");

  if (!usuarioLogado || perfil.email !== usuarioLogado.email) {
    btnEditar.style.display = "none";
    btnSalvar.style.display = "none";
    btnCancelar.style.display = "none";
  } else {
    btnEditar.style.display = "inline-block";
    btnSalvar.style.display = "none";
    btnCancelar.style.display = "none";
  }
}

function entrarEdicao() {
  modoEdicao = true

  document.getElementById("perfilNome").innerHTML =
    `<input type="text" id="editNome" value="${usuarioLogado.username || ""}" class="input_editar_perfil" placeholder="Seu nome">`
  document.getElementById("perfilEmail").innerHTML =
    `<input type="email" id="editEmail" value="${usuarioLogado.email || ""}" class="input_editar_perfil" placeholder="Seu email">`
  document.getElementById("perfilIdade").innerHTML =
    `<input type="number" id="editIdade" value="${usuarioLogado.idade || ""}" class="input_editar_perfil" placeholder="Sua idade">`
  document.getElementById("perfilPosicao").innerHTML = `<select id="editPosicao" class="select_editar_perfil">
      <option class="option_editar_perfil" value="Goleira" ${usuarioLogado.posicao === "Goleira" ? "selected" : ""}>Goleira</option>
      <option class="option_editar_perfil" value="Zagueira" ${usuarioLogado.posicao === "Zagueira" ? "selected" : ""}>Zagueira</option>
      <option class="option_editar_perfil" value="Lateral" ${usuarioLogado.posicao === "Lateral" ? "selected" : ""}>Lateral</option>
      <option class="option_editar_perfil" value="Meio-campo" ${usuarioLogado.posicao === "Meio-campo" ? "selected" : ""}>Meio-campo</option>
      <option class="option_editar_perfil" value="Atacante" ${usuarioLogado.posicao === "Atacante" ? "selected" : ""}>Atacante</option>
    </select>`
  document.getElementById("perfilCidade").innerHTML =
    `<input type="text" id="editCidade" value="${usuarioLogado.cidade || ""}" class="input_editar_perfil" placeholder="Sua cidade">`

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

  sessionStorage.setItem("logado", JSON.stringify(usuarioLogado))

  modoEdicao = false
  mostrarPerfil(usuarioLogado) 

  document.getElementById("btnEditar").style.display = "inline-block"
  document.getElementById("btnSalvar").style.display = "none"
  document.getElementById("btnCancelar").style.display = "none"

  alert("Perfil atualizado com sucesso!")
}

function cancelarEdicao() {
  modoEdicao = false
  mostrarPerfil(usuarioLogado)  

  document.getElementById("btnEditar").style.display = "inline-block"
  document.getElementById("btnSalvar").style.display = "none"
  document.getElementById("btnCancelar").style.display = "none"
}

