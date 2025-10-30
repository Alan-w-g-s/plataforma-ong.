# Plataforma ONG — Cadastro de Voluntários

**Autor:** [ALAN SILVA]  
**Disciplina:** Desenvolvimento Web — Entrega IV  
**Ano:** 2025

---

## 🔗 Links
- Repositório público: https://github.com/alan-w-g-s/plataforma-ong  
- Deploy (GitHub Pages): https://alan-w-g-s.github.io/plataforma-ong/  *(ou o link que aparecer no seu repo)*

---

## Objetivo da Entrega IV
Consolidar práticas profissionais: **versionamento (Git/GitHub)**, **acessibilidade (WCAG 2.1 AA)**, **otimizações para produção** e **deploy em ambiente público**.

---

## O que foi implementado

### 1. Versionamento (Git / GitHub)
- Estrutura GitFlow recomendada: `main`, `develop`, `feature/*`.
- Commits semânticos (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`).
- Release criada: `v1.0.0`.

### 2. Acessibilidade (WCAG 2.1 AA)
- Estrutura semântica (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Mensagens de erro/sucesso com `aria-live="polite"`.
- Navegação por teclado testada (TAB / Shift+TAB).
- Imagens com `alt` apropriado.
- Modo escuro/alto contraste ativável via botão (atributo `data-theme`).
- Contraste visual verificado (mínimo 4.5:1 para texto normal).
- Suporte para leitores de tela (landmarks, labels e aria attributes).

### 3. Otimização para Produção
- Arquivos minificados (CSS, JS e HTML) na pasta `/dist` (ex.: `styles.min.css`, `app.min.js`).
- Imagens otimizadas e substituídas na pasta `/imagens` (versões reduzidas).
- Uso recomendado de `npx terser` / `npx clean-css-cli` para minificação (ou ferramentas online).

### 4. Deploy
- Deploy realizado via **GitHub Pages** (branch `main` → root).
- Link público disponível (ver topo do README).

---

## Estrutura do Projeto

