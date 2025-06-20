import { carregarPacientes } from './pacienteStorage.js';

function salvarPacientes(pacientes) {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}

function listarPacientes() {
    const lista = document.getElementById('lista-pacientes');
    const pacientes = carregarPacientes();

    if (pacientes.length === 0) {
        lista.innerHTML = '<p>Nenhum paciente foi cadastrado.</p>';
        return;
    }

    renderizarPacientes(pacientes);
}

// Função para mostrar detalhes do paciente
function mostrarDetalhes(paciente) {
    console.log('Abrindo detalhes para:', paciente); // Debug
    
    const detalhesDiv = document.getElementById('detalhes-paciente');
    
    detalhesDiv.innerHTML = `
        <div class="detalhes-container">
            <div class="detalhes-header">
                <h3>Detalhes do Paciente</h3>
                <button onclick="fecharDetalhes()" class="btn-fechar">✕</button>
            </div>
            <div class="detalhes-conteudo">
                <p><strong>Nome:</strong> ${paciente.nome || 'N/A'}</p>
                <p><strong>Motivo da consulta:</strong> ${paciente.motivo || 'N/A'}</p>
                <p><strong>Prioridade:</strong> <span class="prioridade-${(paciente.prioridade || 'normal').toLowerCase()}">${paciente.prioridade || 'Normal'}</span></p>
                <p><strong>Horário de chegada:</strong> ${paciente.horario || 'N/A'}</p>
            </div>
            <div class="detalhes-acoes">
                <button onclick="editarPaciente('${paciente.id}')" class="btn-editar">Editar</button>
                <button onclick="removerPaciente('${paciente.id}')" class="btn-remover">Remover</button>
            </div>
        </div>
    `;

    // Mostrar o modal
    detalhesDiv.style.display = 'flex';
    detalhesDiv.style.justifyContent = 'center';
    detalhesDiv.style.alignItems = 'center';
}

// Função para fechar detalhes
function fecharDetalhes() {
    const detalhesDiv = document.getElementById('detalhes-paciente');
    detalhesDiv.style.display = 'none';
}

// Função para remover paciente
function removerPaciente(id) {
    if (confirm('Tem certeza que deseja remover este paciente da fila?')) {
        const pacientes = carregarPacientes();
        const pacientesFiltrados = pacientes.filter(p => p.id != id);
        
        salvarPacientes(pacientesFiltrados);
        fecharDetalhes();
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
    
    mostrarFormularioEdicao(paciente);
}

// Função para mostrar formulário de edição
function mostrarFormularioEdicao(paciente) {
    const detalhesDiv = document.getElementById('detalhes-paciente');
    
    detalhesDiv.innerHTML = `
        <div class="detalhes-container">
            <div class="detalhes-header">
                <h3>Editar Paciente</h3>
                <button onclick="fecharDetalhes()" class="btn-fechar">✕</button>
            </div>
            <div class="detalhes-conteudo">
                <form id="form-edicao" onsubmit="salvarEdicao(event, '${paciente.id}')">
                    <div class="campo-edicao">
                        <label for="motivo-edit"><strong>Motivo da consulta:</strong></label>
                        <textarea id="motivo-edit" rows="3" required>${paciente.motivo || ''}</textarea>
                    </div>
                    
                    <div class="campo-edicao">
                        <label for="prioridade-edit"><strong>Prioridade:</strong></label>
                        <select id="prioridade-edit" required>
                            <option value="Normal" ${(paciente.prioridade || 'Normal') === 'Normal' ? 'selected' : ''}>Normal</option>
                            <option value="Media" ${paciente.prioridade === 'Media' ? 'selected' : ''}>Média</option>
                            <option value="Alta" ${paciente.prioridade === 'Alta' ? 'selected' : ''}>Alta</option>
                        </select>
                    </div>
                    
                    <div class="info-readonly">
                        <p><strong>Nome:</strong> ${paciente.nome || 'N/A'}</p>
                        <p><strong>Horário de chegada:</strong> ${paciente.horario || 'N/A'}</p>
                    </div>
                </form>
            </div>
            <div class="detalhes-acoes">
                <button onclick="salvarEdicao(null, '${paciente.id}')" class="btn-editar">Salvar</button>
                <button onclick="cancelarEdicao('${paciente.id}')" class="btn-cancelar">Cancelar</button>
            </div>
        </div>
    `;
    
    // Mostrar o modal
    detalhesDiv.style.display = 'flex';
    detalhesDiv.style.justifyContent = 'center';
    detalhesDiv.style.alignItems = 'center';
}

// Função para salvar edição
function salvarEdicao(event, id) {
    if (event) event.preventDefault();
    
    const motivo = document.getElementById('motivo-edit').value.trim();
    const prioridade = document.getElementById('prioridade-edit').value;
    
    if (!motivo) {
        alert('O motivo da consulta é obrigatório!');
        return;
    }
    
    const pacientes = carregarPacientes();
    const indice = pacientes.findIndex(p => p.id == id);
    
    if (indice !== -1) {
        pacientes[indice].motivo = motivo;
        pacientes[indice].prioridade = prioridade;
        
        salvarPacientes(pacientes);
        fecharDetalhes();
        listarPacientes();
        
        alert('Paciente atualizado com sucesso!');
    } else {
        alert('Erro ao salvar alterações!');
    }
}

// Função para cancelar edição
function cancelarEdicao(id) {
    const pacientes = carregarPacientes();
    const paciente = pacientes.find(p => p.id == id);
    
    if (paciente) {
        mostrarDetalhes(paciente);
    } else {
        fecharDetalhes();
    }
}

// Função para renderizar a lista de pacientes
function renderizarPacientes(pacientes) {
    const listaPacientes = document.getElementById('lista-pacientes');

    listaPacientes.innerHTML = pacientes.map(paciente => {
        const nome = paciente.nome || 'Nome não informado';
        const prioridade = paciente.prioridade || 'Normal';
        const prioridadeClass = prioridade.toLowerCase();

        return `
            <div class="card" onclick="mostrarDetalhes(${JSON.stringify(paciente).replace(/"/g, '&quot;')})">
                <strong>${nome}</strong>
                <p>Prioridade: <span class="prioridade-${prioridadeClass}">${prioridade}</span></p>
            </div>
        `;
    }).join('');
}

// Fechar modal ao clicar no fundo
document.addEventListener('click', function(event) {
    const detalhesDiv = document.getElementById('detalhes-paciente');
    if (event.target === detalhesDiv) {
        fecharDetalhes();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharDetalhes();
    }
});

// Tornar as funções globais
window.mostrarDetalhes = mostrarDetalhes;
window.fecharDetalhes = fecharDetalhes;
window.removerPaciente = removerPaciente;
window.editarPaciente = editarPaciente;
window.salvarEdicao = salvarEdicao;
window.cancelarEdicao = cancelarEdicao;

// Inicializar a lista
listarPacientes();