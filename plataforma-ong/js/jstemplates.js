// templates.js
// Apenas templates reduzidos de fallback caso o fetch falhe.
// Mantemos estrutura mínima compatível com seu CSS e com o formValidator.

export const templates = {
  "/": `
    <section id="sobre">
      <h1>Quem Somos</h1>
      <p>Nossa ONG atua em projetos sociais voltados à educação, saúde e meio ambiente...</p>
    </section>
    <section id="valores">
      <h2>Missão, Visão e Valores</h2>
      <ul>
        <li><strong>Missão:</strong> Promover inclusão e desenvolvimento social.</li>
        <li><strong>Visão:</strong> Ser referência em transformação comunitária.</li>
        <li><strong>Valores:</strong> Transparência, Solidariedade e Sustentabilidade.</li>
      </ul>
    </section>
  `,

  "/projetos.html": `
    <section id="projetos">
      <h1>Projetos Sociais</h1>
      <article class="card">
        <h2>Projeto Esperança</h2>
        <p>Atuação com crianças em situação de vulnerabilidade, oferecendo reforço escolar.</p>
      </article>
      <article class="card">
        <h2>Projeto Verde Vivo</h2>
        <p>Iniciativa de reflorestamento urbano e conscientização ambiental.</p>
      </article>
    </section>
    <section id="como-participar">
      <h2>Como Participar</h2>
      <p>Seja voluntário ou faça uma doação online.</p>
      <ul>
        <li><a href="cadastro.html">Cadastre-se como voluntário</a></li>
      </ul>
    </section>
  `,

  "/cadastro.html": `
    <section id="cadastro">
      <h1>Cadastro de Voluntário</h1>
      <form id="formCadastro" novalidate>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <label for="nome">Nome Completo:</label>
          <input type="text" id="nome" name="nome" required>

          <label for="email">E-mail:</label>
          <input type="email" id="email" name="email" required>

          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required>

          <label for="telefone">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required>

          <label for="nascimento">Data de Nascimento:</label>
          <input type="date" id="nascimento" name="nascimento" required>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <label for="cep">CEP:</label>
          <input type="text" id="cep" name="cep" placeholder="00000-000" required>

          <label for="endereco">Endereço:</label>
          <input type="text" id="endereco" name="endereco" required>

          <label for="cidade">Cidade:</label>
          <input type="text" id="cidade" name="cidade" required>

          <label for="estado">Estado:</label>
          <input type="text" id="estado" name="estado" maxlength="2" required>
        </fieldset>

        <button type="submit">Enviar Cadastro</button>
      </form>

      <div id="mensagem" aria-live="polite" style="margin-top: 12px;"></div>
    </section>
  `
};
