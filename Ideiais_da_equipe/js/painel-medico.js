// Mock de pacientes aguardando (poderia vir de uma API)
const pacientes = [
  {
    id: 1,
    nome: "Maria Oliveira",
    idade: 43,
    prioridade: "Amarela",
    sintomas: "Dor abdominal intensa",
    horario: "09:10"
  },
  {
    id: 2,
    nome: "João Souza",
    idade: 27,
    prioridade: "Verde",
    sintomas: "Febre e tosse leve",
    horario: "09:22"
  },
  {
    id: 3,
    nome: "Carla Mendes",
    idade: 61,
    prioridade: "Vermelha",
    sintomas: "Falta de ar, pressão baixa",
    horario: "09:31"
  }
];

let pacientesAguardando = [...pacientes]; // Estado local
let pacienteSelecionado = null;

const listaUl = document.getElementById("pacientes");
const detalhesDiv = document.getElementById("detalhes-paciente");
const infoDiv = document.getElementById("info");
const textareaObs = document.getElementById("observacoes");
const btnFinalizar = document.getElementById("finalizar");
const btnVoltar = document.getElementById("voltar");

// Renderiza a lista de pacientes
function renderizarLista() {
  listaUl.innerHTML = "";
  if (pacientesAguardando.length === 0) {
    listaUl.innerHTML = "<li>Nenhum paciente aguardando.</li>";
    return;
  }
  pacientesAguardando.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} (${p.prioridade}) - ${p.horario}`;
    li.onclick = () => selecionarPaciente(p.id);
    listaUl.appendChild(li);
  });
}

// Mostra detalhes do paciente selecionado
function selecionarPaciente(id) {
  pacienteSelecionado = pacientesAguardando.find(p => p.id === id);
  infoDiv.innerHTML = `
    <strong>Nome:</strong> ${pacienteSelecionado.nome}<br>
    <strong>Idade:</strong> ${pacienteSelecionado.idade}<br>
    <strong>Prioridade:</strong> ${pacienteSelecionado.prioridade}<br>
    <strong>Sintomas:</strong> ${pacienteSelecionado.sintomas}<br>
    <strong>Horário de chegada:</strong> ${pacienteSelecionado.horario}
  `;
  detalhesDiv.classList.remove("hidden");
  document.getElementById("lista-pacientes").classList.add("hidden");
  textareaObs.value = "";
}

// Finaliza o atendimento e remove o paciente da lista
btnFinalizar.onclick = function () {
  if (textareaObs.value.trim() === "") {
    alert("Por favor, preencha as observações do atendimento.");
    return;
  }
  pacientesAguardando = pacientesAguardando.filter(p => p.id !== pacienteSelecionado.id);
  detalhesDiv.classList.add("hidden");
  document.getElementById("lista-pacientes").classList.remove("hidden");
  renderizarLista();
  alert("Atendimento finalizado! Observação salva: " + textareaObs.value);
};

btnVoltar.onclick = function () {
  detalhesDiv.classList.add("hidden");
  document.getElementById("lista-pacientes").classList.remove("hidden");
};

renderizarLista();
