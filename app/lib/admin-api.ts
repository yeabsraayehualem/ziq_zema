export type AdminUser = { phone: string; name: string; role: string };
type CsrfResponse = { csrfToken: string };

const root = "/api/backend";
let csrfToken = "";

export async function refreshCsrf() {
  const response = await fetch(`${root}/auth/csrf`, { credentials: "include", cache: "no-store" });
  const data = await response.json().catch(() => ({})) as Partial<CsrfResponse> & { detail?: string };
  if (!response.ok || !data.csrfToken) {
    throw new Error(data.detail ?? `Unable to load the CSRF token (HTTP ${response.status}).`);
  }
  csrfToken = data.csrfToken;
  return csrfToken;
}

export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();
  const endpoint = path.replace(/\/+$/, "");
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    if (!csrfToken) await refreshCsrf();
    headers.set("X-CSRFToken", csrfToken);
  }
  const response = await fetch(`${root}${endpoint}`, { ...init, headers, credentials: "include", cache: "no-store" });
  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data.detail === "string" ? data.detail : Object.values(data).flat().join(" ") || "Request failed.";
    throw new Error(String(message));
  }
  return data as T;
}

export const jsonBody = (value: unknown): string => JSON.stringify(value);
