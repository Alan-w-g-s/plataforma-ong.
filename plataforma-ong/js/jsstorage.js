// storage.js
// Funções simples para persistência em localStorage

export function saveToStorage(key, data) {
  try {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    console.error("Erro ao salvar no localStorage:", err);
  }
}

export function getFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (err) {
    console.error("Erro ao ler localStorage:", err);
    return [];
  }
}

export function removeFromStorage(key, id) {
  try {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const filtered = existing.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
  } catch (err) {
    console.error("Erro ao remover item do localStorage:", err);
  }
}

export function clearStorage(key) {
  localStorage.removeItem(key);
}
