let usuarioLogado;
let modoEdicao = false;

window.onload = function () {
  usuarioLogado = JSON.parse(localStorage.getItem("logado"));

  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar o perfil!");
    window.location.href = "login.html";
    return;
  }

  mostrarPerfil();
};

function mostrarPerfil() {
  document.getElementById("perfilNome").innerText = usuarioLogado.username;
  document.getElementById("perfilEmail").innerText = usuarioLogado.email;
  document.getElementById("perfilIdade").innerText = usuarioLogado.idade;
  document.getElementById("perfilPosicao").innerText = usuarioLogado.posicao;
  document.getElementById("perfilCidade").innerText = usuarioLogado.cidade;

  if (usuarioLogado.foto) {
    document.getElementById("perfilFoto").src = usuarioLogado.foto;
  }
}

function entrarEdicao() {
  modoEdicao = true;


  document.getElementById("perfilNome").innerHTML =
    `<input type="text" id="editNome" value="${usuarioLogado.username}">`;
  document.getElementById("perfilEmail").innerHTML =
    `<input type="email" id="editEmail" value="${usuarioLogado.email}">`;
  document.getElementById("perfilIdade").innerHTML =
    `<input type="number" id="editIdade" value="${usuarioLogado.idade}">`;
  document.getElementById("perfilPosicao").innerHTML =
    `<input type="text" id="editPosicao" value="${usuarioLogado.posicao}">`;
  document.getElementById("perfilCidade").innerHTML =
    `<input type="text" id="editCidade" value="${usuarioLogado.cidade}">`;

  document.getElementById("btnEditar").style.display = "none";
  document.getElementById("btnSalvar").style.display = "inline-block";
  document.getElementById("btnCancelar").style.display = "inline-block";
}

function salvarEdicao() {
  if (!modoEdicao) return;

  usuarioLogado.username = document.getElementById("editNome").value;
  usuarioLogado.email = document.getElementById("editEmail").value;
  usuarioLogado.idade = document.getElementById("editIdade").value;
  usuarioLogado.posicao = document.getElementById("editPosicao").value;
  usuarioLogado.cidade = document.getElementById("editCidade").value;


  let contas = JSON.parse(localStorage.getItem("contas")) || [];
  let indice = contas.findIndex(c => c.email === usuarioLogado.email);
  if (indice !== -1) {
    contas[indice] = usuarioLogado;
    localStorage.setItem("contas", JSON.stringify(contas));
  }

  localStorage.setItem("logado", JSON.stringify(usuarioLogado));

  modoEdicao = false;
  mostrarPerfil();

  document.getElementById("btnEditar").style.display = "inline-block";
  document.getElementById("btnSalvar").style.display = "none";
  document.getElementById("btnCancelar").style.display = "none";

  alert("Perfil atualizado com sucesso!");
}

function cancelarEdicao() {
  modoEdicao = false;
  mostrarPerfil();

  document.getElementById("btnEditar").style.display = "inline-block";
  document.getElementById("btnSalvar").style.display = "none";
  document.getElementById("btnCancelar").style.display = "none";
}
