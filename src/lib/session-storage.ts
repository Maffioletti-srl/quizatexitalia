/**
 * Accès sessionStorage tolérant aux erreurs (navigation privée, stockage
 * bloqué, rendu serveur) : en cas d'échec on renvoie simplement null.
 */
export function readSession<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeSession(key: string, value: unknown): void {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // stockage indisponible : l'état reste en mémoire
  }
}

export function removeSession(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}
