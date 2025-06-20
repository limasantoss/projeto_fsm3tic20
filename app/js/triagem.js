
let selecionado = null;
function renderizar() {
  const lista = getPacientes().filter(p => p.status === "aguardando_triagem");
  const ul = document.getElementById("lista");
  ul.innerHTML = "";
  if (lista.length === 0) {
    ul.innerHTML = "<li>Nenhum paciente aguardando.</li>";
    return;
  }
  lista.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} (${p.idade} anos) - ${p.sintomas}`;
    li.onclick = () => iniciarTriagem(p);
    ul.appendChild(li);
  });
}
function iniciarTriagem(p) {
  selecionado = p;
  document.getElementById("dados").innerHTML =
    `<b>Nome:</b> ${p.nome}<br><b>Idade:</b> ${p.idade}<br><b>Sintomas:</b> ${p.sintomas}`;
  document.getElementById("triagem").classList.remove("hidden");
  document.getElementById("lista").classList.add("hidden");
}
document.getElementById("salvar").onclick = function() {
  const prioridade = document.getElementById("prioridade").value;
  if (!prioridade) { alert("Selecione a prioridade!"); return; }
  atualizarPaciente(selecionado.id, {
    prioridade: prioridade,
    status: "aguardando_medico"
  });
  selecionado = null;
  document.getElementById("triagem").classList.add("hidden");
  document.getElementById("lista").classList.remove("hidden");
  renderizar();
}
document.getElementById("voltar").onclick = function() {
  document.getElementById("triagem").classList.add("hidden");
  document.getElementById("lista").classList.remove("hidden");
}
renderizar();
setInterval(renderizar, 4000);
