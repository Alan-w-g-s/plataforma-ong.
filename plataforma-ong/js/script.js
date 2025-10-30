// script.js

// Função para aplicar máscara de CPF
function mascaraCPF(cpf) {
    cpf.value = cpf.value
        .replace(/\D/g, '')           // Remove tudo que não é número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Função para aplicar máscara de telefone
function mascaraTelefone(telefone) {
    telefone.value = telefone.value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
}

// Função para aplicar máscara de CEP
function mascaraCEP(cep) {
    cep.value = cep.value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2');
}

// Adiciona evento para as máscaras e validações
window.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const form = document.querySelector('form');

    // Aplica as máscaras enquanto digita
    if (cpfInput) cpfInput.addEventListener('input', () => mascaraCPF(cpfInput));
    if (telefoneInput) telefoneInput.addEventListener('input', () => mascaraTelefone(telefoneInput));
    if (cepInput) cepInput.addEventListener('input', () => mascaraCEP(cepInput));

    // Função para validar campos obrigatórios
    function validarFormulario() {
        let valido = true;
        const camposObrigatorios = form.querySelectorAll('[required]');

        camposObrigatorios.forEach(campo => {
            const erro = campo.nextElementSibling;
            if (erro && erro.classList.contains('erro')) erro.remove();

            if (!campo.value.trim()) {
                const mensagemErro = document.createElement('span');
                mensagemErro.textContent = `O campo ${campo.name || campo.id} é obrigatório.`;
                mensagemErro.classList.add('erro');
                mensagemErro.style.color = 'red';
                mensagemErro.style.fontSize = '0.9em';
                campo.insertAdjacentElement('afterend', mensagemErro);
                valido = false;
            }
        });
        return valido;
    }

    // Função para salvar dados no localStorage
    function salvarCadastro(dados) {
        let cadastros = JSON.parse(localStorage.getItem('voluntarios')) || [];
        cadastros.push(dados);
        localStorage.setItem('voluntarios', JSON.stringify(cadastros));
    }

    // Evento de envio do formulário
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validarFormulario()) {
                const dados = {
                    nome: form.nome.value,
                    email: form.email.value,
                    telefone: form.telefone.value,
                    cpf: form.cpf.value,
                    cep: form.cep.value,
                    endereco: form.endereco.value
                };

                salvarCadastro(dados);
                alert('Cadastro realizado com sucesso! ✅');
                form.reset();
            } else {
                alert('Por favor, corrija os campos destacados em vermelho.');
            }
        });
    }
});

