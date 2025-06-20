
const form = document.getElementById("formCadastro");
const msg = document.getElementById("msg");
form.onsubmit = e => {
  e.preventDefault();
  const paciente = {
    nome: form.nome.value,
    idade: Number(form.idade.value),
    sintomas: form.sintomas.value
  };
  cadastrarPaciente(paciente);
  msg.innerHTML = "Paciente cadastrado com sucesso!";
  form.reset();
};
