
let selecionado = null;
function renderizar() {
  const lista = getPacientes().filter(p => p.status === "aguardando_medico");
  const ul = document.getElementById("lista");
  ul.innerHTML = "";
  if (lista.length === 0) {
    ul.innerHTML = "<li>Nenhum paciente aguardando.</li>";
    return;
  }
  lista.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} (${p.prioridade || "Sem prioridade"})`;
    li.onclick = () => iniciarAtendimento(p);
    ul.appendChild(li);
  });
}
function iniciarAtendimento(p) {
  selecionado = p;
  document.getElementById("dados").innerHTML =
    `<b>Nome:</b> ${p.nome}<br><b>Idade:</b> ${p.idade}<br><b>Sintomas:</b> ${p.sintomas}<br><b>Prioridade:</b> ${p.prioridade}`;
  document.getElementById("atendimento").classList.remove("hidden");
  document.getElementById("lista").classList.add("hidden");
}
document.getElementById("finalizar").onclick = function() {
  const obs = document.getElementById("obs").value;
  if (!obs) { alert("Preencha as observações!"); return; }
  atualizarPaciente(selecionado.id, {
    status: "finalizado",
    obs: obs
  });
  selecionado = null;
  document.getElementById("atendimento").classList.add("hidden");
  document.getElementById("lista").classList.remove("hidden");
  renderizar();
}
document.getElementById("voltar").onclick = function() {
  document.getElementById("atendimento").classList.add("hidden");
  document.getElementById("lista").classList.remove("hidden");
}
renderizar();
setInterval(renderizar, 4000);
