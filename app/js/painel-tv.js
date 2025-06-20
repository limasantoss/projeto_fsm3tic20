
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
    li.textContent = `${p.nome} (${p.idade} anos) - Sintomas: ${p.sintomas}`;
    ul.appendChild(li);
  });
}
renderizar();
setInterval(renderizar, 3000);
