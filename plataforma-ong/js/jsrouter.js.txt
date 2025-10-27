// router.js
// Responsável por carregar as "views" dentro do <main> sem recarregar a página.

import { templates } from "./templates.js";
import { initFormValidation } from "./formValidator.js";

// Função que tenta carregar o arquivo HTML correspondente via fetch.
// Se fetch falhar (ex.: servindo via file://), usa templates fallback.
async function loadView(path) {
  // Normaliza: se o path terminar apenas com '/', usa '/'
  const normalized = path === "/" ? "/index.html" : path;

  try {
    const res = await fetch(normalized, { cache: "no-store" });
    if (!res.ok) throw new Error("fetch error");
    const text = await res.text();

    // Extrai o conteúdo da tag <main> do arquivo HTML remoto/local
    const mainMatch = text.match(/<main[^>]*>((.|[\r\n])*)<\/main>/i);
    if (mainMatch) return mainMatch[1];
    // Se não achar <main>, devolve o corpo inteiro como fallback
    const bodyMatch = text.match(/<body[^>]*>((.|[\r\n])*)<\/body>/i);
    return bodyMatch ? bodyMatch[1] : text;
  } catch (err) {
    // Fetch pode falhar em file:// — usa templates fallback
    const key = path === "/" ? "/" : path;
    return templates[key] || templates["/"];
  }
}

export async function navigateTo(path, container) {
  // Garante que path tenha formato de rota (ex: "/cadastro.html")
  const viewHtml = await loadView(path);

  // Injeta conteúdo no main
  container.innerHTML = viewHtml;

  // Se a rota for cadastro, inicia validação
  if (path.includes("cadastro")) {
    initFormValidation();
  }

  // se quiser outras inicializações por rota, adicione aqui
}

export function handleInitialRoute(path, container) {
  // Se estiver em / ou /index.html, exibe home
  const initialPath = (path === "/" || path === "/index.html") ? "/" : path;
  navigateTo(initialPath, container);
}
