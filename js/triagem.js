import { carregarPacientes } from './pacienteStorage.js';

function listarPacientes() {
    const lista = document.getElementById('lista-pacientes');
    lista.innerHTML = '<p><strong>Lista de pacientes</strong></p>';

    const pacientes = carregarPacientes();

    if (pacientes.length === 0) {
        lista.innerHTML = '<p>Nenhum paciente foi cadastrado.</p>';
        return;
    }

    pacientes.forEach((paciente) => {
        const div = document.createElement('div');
        div.className = 'card';

        const nomeElemento = document.createElement('strong');
        nomeElemento.innerText = paciente.nome;
        nomeElemento.style.cursor = 'pointer';

        const motivoElemento = document.createElement('p');
        motivoElemento.innerText = paciente.motivo;
        motivoElemento.style.display = 'none';
        motivoElemento.style.margin = '8px 0 0 0';

        nomeElemento.addEventListener('click', () => {
            motivoElemento.style.display = motivoElemento.style.display === 'none' ? 'block' : 'none';
        })

        div.appendChild(nomeElemento);
        div.appendChild(motivoElemento);
        lista.appendChild(div);

    })

}

listarPacientes();

