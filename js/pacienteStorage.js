export function carregarPacientes() {
    const dados = localStorage.getItem('pacientes');
    if (dados) {
        return JSON.parse(dados);
    } else {
        return [];
    }
}