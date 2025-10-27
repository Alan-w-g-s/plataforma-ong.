// app.js
// Ponto de entrada da aplicação SPA
import { navigateTo, handleInitialRoute } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("main");

  // Delegação para links do nav (funciona mesmo se nav for re-renderizado)
  document.body.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");

    // Não intercepta links externos ou anchors com target _blank
    if (!href || href.startsWith("http") || a.target === "_blank" || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    // Intercepta links internos e faz navegação SPA
    e.preventDefault();
    history.pushState({}, "", href);
    navigateTo(window.location.pathname, app);
  });

  // Navegação com botões do navegador (voltar/avançar)
  window.addEventListener("popstate", () => {
    navigateTo(window.location.pathname, app);
  });

  // Carrega a rota inicial (se o usuário entrou direto em /cadastro.html, por exemplo)
  handleInitialRoute(window.location.pathname, app);
});
