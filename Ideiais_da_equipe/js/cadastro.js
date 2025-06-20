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
    div.innerHTML = `
      <strong>${p.nome}</strong><br>
      <p>${p.motivo}</p>
      <p><strong>Prioridade:</strong> ${p.prioridade || 'Normal'}</p>
      <p><strong>Horário:</strong> ${p.horario}</p>
      <button onclick="editarPaciente('${p.id}')" style="margin-right: 10px; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">Editar</button>
      <button onclick="removerPaciente('${p.id}')" style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer;">Remover</button>
    `;
    lista.appendChild(div);
  });
}

// Função para remover paciente
function removerPaciente(id) {
  if (confirm('Tem certeza que deseja remover este paciente?')) {
    const pacientes = carregarPacientes();
    const pacientesFiltrados = pacientes.filter(p => p.id != id);
    
    salvarPacientes(pacientesFiltrados);
    listarPacientes();
    
    alert('Paciente removido com sucesso!');
  }
}

// Função para editar paciente
function editarPaciente(id) {
  const pacientes = carregarPacientes();
  const paciente = pacientes.find(p => p.id == id);
  
  if (!paciente) {
    alert('Paciente não encontrado!');
    return;
  }
  
  // Criar modal simples usando prompt
  const novoMotivo = prompt('Editar motivo da consulta:', paciente.motivo);
  if (novoMotivo === null) return; // Cancelado
  
  if (!novoMotivo.trim()) {
    alert('O motivo da consulta é obrigatório!');
    return;
  }
  
  const prioridades = ['Normal', 'Media', 'Alta'];
  let novaPrioridade = prompt(
    'Escolha a prioridade (digite o número):\n1 - Normal\n2 - Média\n3 - Alta', 
    prioridades.indexOf(paciente.prioridade || 'Normal') + 1
  );
  
  if (novaPrioridade === null) return; // Cancelado
  
  const prioridadeIndex = parseInt(novaPrioridade) - 1;
  if (prioridadeIndex < 0 || prioridadeIndex > 2) {
    alert('Prioridade inválida! Mantendo a anterior.');
    novaPrioridade = paciente.prioridade || 'Normal';
  } else {
    novaPrioridade = prioridades[prioridadeIndex];
  }
  
  // Salvar alterações
  const indice = pacientes.findIndex(p => p.id == id);
  if (indice !== -1) {
    pacientes[indice].motivo = novoMotivo.trim();
    pacientes[indice].prioridade = novaPrioridade;
    
    salvarPacientes(pacientes);
    listarPacientes();
    
    alert('Paciente atualizado com sucesso!');
  }
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
    motivo,
    prioridade: 'Normal', // Prioridade padrão
    horario: new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const pacientes = carregarPacientes();
  pacientes.push(novoPaciente);
  salvarPacientes(pacientes);

  formulario.reset();
  listarPacientes();
});

// Tornar funções globais
window.removerPaciente = removerPaciente;
window.editarPaciente = editarPaciente;

listarPacientes();