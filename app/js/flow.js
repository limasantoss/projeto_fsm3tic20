
function getPacientes() {
  return JSON.parse(localStorage.getItem("pacientes") || "[]");
}
function salvarPacientes(arr) {
  localStorage.setItem("pacientes", JSON.stringify(arr));
}
function cadastrarPaciente(p) {
  let lista = getPacientes();
  p.id = Date.now();
  p.status = "aguardando_triagem";
  lista.push(p);
  salvarPacientes(lista);
}
function atualizarPaciente(id, dados) {
  let lista = getPacientes();
  let idx = lista.findIndex(p => p.id === id);
  if (idx >= 0) {
    lista[idx] = {...lista[idx], ...dados};
    salvarPacientes(lista);
  }
}
function removerPaciente(id) {
  let lista = getPacientes();
  lista = lista.filter(p => p.id !== id);
  salvarPacientes(lista);
}
