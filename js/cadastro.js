import { carregarPacientes } from './pacienteStorage.js';

const formulario = document.getElementById('formulario-paciente');
const lista = document.getElementById('lista-pacientes');


function salvarPacientes(pacientes) {
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
}



function listarPacientes() {
  const pacientes = carregarPacientes();
  lista.innerHTML = '';

  if (pacientes.length === 0) {
    lista.innerHTML = '<p>Nenhum paciente foi cadastrado.</p>';
    return;
  }

  pacientes.map((p) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${p.nome}</strong><br><p>${p.motivo}</p>`;
    lista.appendChild(div);
  });
}


formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const motivo = document.getElementById('motivo').value.trim();

  if(!nome || !motivo){
    return;
  } 

  const novoPaciente = {
    id: Date.now(),
    nome,
    motivo
  };

  const pacientes = carregarPacientes();
  pacientes.push(novoPaciente);
  salvarPacientes(pacientes);

  formulario.reset();
  listarPacientes();
});


listarPacientes();
