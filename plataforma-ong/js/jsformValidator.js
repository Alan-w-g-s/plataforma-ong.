// formValidator.js
// Validação do formulário, máscaras básicas e integração com storage.js

import { saveToStorage } from "./storage.js";

// Máscaras simples (formatadoras) — funcionando com input events
function applyMaskCPF(value) {
  // remove tudo que não é dígito
  const v = value.replace(/\D/g, "").slice(0, 11);
  return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") || v.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3").replace(/(\d{3})(\d{3})/, "$1.$2");
}
function applyMaskTelefone(value) {
  const v = value.replace(/\D/g, "").slice(0, 11);
  if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
  return v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
function applyMaskCEP(value) {
  const v = value.replace(/\D/g, "").slice(0, 8);
  return v.replace(/(\d{5})(\d{3})/, "$1-$2");
}

// Função principal que adiciona listeners de validação e submit
export function initFormValidation() {
  const form = document.getElementById("formCadastro");
  if (!form) return;

  const msgBox = document.getElementById("mensagem");

  // Adiciona máscaras em inputs específicos, se existirem
  const cpfInput = form.querySelector("#cpf");
  const telInput = form.querySelector("#telefone");
  const cepInput = form.querySelector("#cep");

  if (cpfInput) {
    cpfInput.addEventListener("input", (e) => {
      const pos = e.target.selectionStart;
      e.target.value = applyMaskCPF(e.target.value);
      // tenta manter cursor no final (simples)
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (telInput) {
    telInput.addEventListener("input", (e) => {
      const pos = e.target.selectionStart;
      e.target.value = applyMaskTelefone(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (cepInput) {
    cepInput.addEventListener("input", (e) => {
      const pos = e.target.selectionStart;
      e.target.value = applyMaskCEP(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  // Validação no submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msgBox.innerHTML = "";

    // Lê valores (use .value.trim() para evitar espaços)
    const nome = (form.querySelector("#nome")?.value || "").trim();
    const email = (form.querySelector("#email")?.value || "").trim();
    const cpf = (form.querySelector("#cpf")?.value || "").trim();
    const telefone = (form.querySelector("#telefone")?.value || "").trim();
    const nascimento = (form.querySelector("#nascimento")?.value || "").trim();
    const cep = (form.querySelector("#cep")?.value || "").trim();
    const endereco = (form.querySelector("#endereco")?.value || "").trim();
    const cidade = (form.querySelector("#cidade")?.value || "").trim();
    const estado = (form.querySelector("#estado")?.value || "").trim();

    const erros = [];

    // Regras de validação
    if (nome.length < 3) erros.push("Nome deve conter ao menos 3 caracteres.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erros.push("E-mail inválido.");
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) erros.push("CPF inválido — use o formato 000.000.000-00.");
    if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone)) erros.push("Telefone inválido — use o formato (00) 00000-0000.");
    if (!nascimento) erros.push("Informe a data de nascimento.");
    if (!/^\d{5}-\d{3}$/.test(cep)) erros.push("CEP inválido — use o formato 00000-000.");
    if (endereco.length < 5) erros.push("Endereço muito curto.");
    if (cidade.length < 2) erros.push("Cidade inválida.");
    if (!/^[A-Za-z]{2}$/.test(estado)) erros.push("Estado inválido — digite a sigla com 2 letras.");

    if (erros.length > 0) {
      // Exibe lista de erros e foca no primeiro campo inválido
      msgBox.innerHTML = `<div style="color: var(--cor-erro);"><strong>Corrija os seguintes itens:</strong><ul>${erros.map(r => `<li>${r}</li>`).join("")}</ul></div>`;
      // tenta focar no primeiro campo com erro (heurística)
      const firstError = erros[0];
      if (firstError.includes("Nome")) form.querySelector("#nome")?.focus();
      else if (firstError.includes("E-mail")) form.querySelector("#email")?.focus();
      else if (firstError.includes("CPF")) form.querySelector("#cpf")?.focus();
      else if (firstError.includes("Telefone")) form.querySelector("#telefone")?.focus();
      else if (firstError.includes("nascimento")) form.querySelector("#nascimento")?.focus();
      else if (firstError.includes("CEP")) form.querySelector("#cep")?.focus();
      else if (firstError.includes("Endereço")) form.querySelector("#endereco")?.focus();
      return;
    }

    // Se passou nas validações: prepara objeto e salva
    const voluntario = {
      id: Date.now(),
      nome,
      email,
      cpf,
      telefone,
      nascimento,
      endereco,
      cidade,
      estado,
      cep,
      criadoEm: new Date().toISOString()
    };

    saveToStorage("voluntarios", voluntario);

    // Mensagem de sucesso e reset do formulário
    msgBox.innerHTML = `<div style="color: var(--cor-sucesso);"><strong>Cadastro realizado com sucesso!</strong></div>`;
    form.reset();

    // opcional: rolar até mensagem
    msgBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
