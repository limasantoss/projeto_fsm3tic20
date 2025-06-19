import { carregarPacientes } from './pacienteStorage.js';

// Elementos do DOM
const totalPacientesEl = document.getElementById('total-pacientes');
const pacientesUrgentesEl = document.getElementById('pacientes-urgentes');
const pacientesMediosEl = document.getElementById('pacientes-medios');
const pacientesNormaisEl = document.getElementById('pacientes-normais');
const listaPacientesTv = document.getElementById('lista-pacientes-tv');
const dataAtualEl = document.getElementById('data-atual');
const horarioAtualEl = document.getElementById('horario-atual');

// Função para atualizar data e hora
function atualizarDataHora() {
    const agora = new Date();
    
    const dataFormatada = agora.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const horaFormatada = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    dataAtualEl.textContent = dataFormatada;
    horarioAtualEl.textContent = horaFormatada;
}

// Função para calcular estatísticas
function calcularEstatisticas(pacientes) {
    const stats = {
        total: pacientes.length,
        alta: 0,
        media: 0,
        normal: 0
    };
    
    pacientes.forEach(paciente => {
        const prioridade = (paciente.prioridade || 'Normal').toLowerCase();
        
        switch(prioridade) {
            case 'alta':
                stats.alta++;
                break;
            case 'media':
                stats.media++;
                break;
            default:
                stats.normal++;
                break;
        }
    });
    
    return stats;
}

// Função para atualizar estatísticas na tela
function atualizarEstatisticas(stats) {
    totalPacientesEl.textContent = stats.total;
    pacientesUrgentesEl.textContent = stats.alta;
    pacientesMediosEl.textContent = stats.media;
    pacientesNormaisEl.textContent = stats.normal;
}

// Função para ordenar pacientes por prioridade
function ordenarPacientesPorPrioridade(pacientes) {
    const prioridadeOrdem = { 'alta': 1, 'media': 2, 'normal': 3 };
    
    return pacientes.sort((a, b) => {
        const prioridadeA = (a.prioridade || 'Normal').toLowerCase();
        const prioridadeB = (b.prioridade || 'Normal').toLowerCase();
        
        const ordemA = prioridadeOrdem[prioridadeA] || 3;
        const ordemB = prioridadeOrdem[prioridadeB] || 3;
        
        // Se prioridades são iguais, ordena por horário de chegada
        if (ordemA === ordemB) {
            return new Date('1970/01/01 ' + a.horario) - new Date('1970/01/01 ' + b.horario);
        }
        
        return ordemA - ordemB;
    });
}

// Função para renderizar lista de pacientes
function renderizarListaPacientes(pacientes) {
    if (pacientes.length === 0) {
        listaPacientesTv.innerHTML = `
            <div class="sem-pacientes">
                <h3>Nenhum paciente na fila</h3>
                <p>A fila de atendimento está vazia no momento.</p>
            </div>
        `;
        return;
    }
    
    const pacientesOrdenados = ordenarPacientesPorPrioridade([...pacientes]);
    
    listaPacientesTv.innerHTML = pacientesOrdenados.map((paciente, index) => {
        const prioridade = (paciente.prioridade || 'Normal').toLowerCase();
        const nome = paciente.nome || 'Nome não informado';
        const horario = paciente.horario || 'N/A';
        const posicao = index + 1;
        
        return `
            <div class="paciente-tv-card prioridade-${prioridade}">
                <div class="prioridade-badge ${prioridade}">
                    ${paciente.prioridade || 'Normal'}
                </div>
                <div class="nome-paciente">
                    ${posicao}º - ${nome}
                </div>
                <div class="horario-chegada">
                    Chegada: ${horario}
                </div>
                <div class="motivo-consulta">
                    ${paciente.motivo || 'Motivo não informado'}
                </div>
            </div>
        `;
    }).join('');
}

// Função principal para carregar e exibir dados
function carregarDadosPainel() {
    const pacientes = carregarPacientes();
    const stats = calcularEstatisticas(pacientes);
    
    atualizarEstatisticas(stats);
    renderizarListaPacientes(pacientes);
}

// Função para auto-atualização
function iniciarAutoAtualizacao() {
    // Atualiza dados a cada 5 segundos
    setInterval(() => {
        carregarDadosPainel();
    }, 5000);
    
    // Atualiza data/hora a cada segundo
    setInterval(atualizarDataHora, 1000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    atualizarDataHora();
    carregarDadosPainel();
    iniciarAutoAtualizacao();
    
    console.log('Painel da TV inicializado com sucesso!');
});

// Atualizar quando a janela ganha foco
window.addEventListener('focus', carregarDadosPainel);

// Exportar funções para uso externo se necessário
window.carregarDadosPainel = carregarDadosPainel;