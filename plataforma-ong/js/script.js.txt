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

// Adiciona evento para as máscaras
window.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.get
