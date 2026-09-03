// ⚠️ Reemplazar cuando el usuario cree el producto en Hotmart y tenga su link de
// checkout (Sesión 6 — ver ESTADO.md, "Pendientes del usuario"). Mientras esté
// vacío, los paywalls NO apuntan a un link falso: muestran un mensaje honesto
// ("esto se conecta cuando actives Hotmart") en su lugar.
//
// Ejemplo de link real de Hotmart: "https://pay.hotmart.com/ABC12345"
export const HOTMART_CHECKOUT_URL = "";

export function hotmartCheckoutHref(email?: string | null): string | null {
  if (!HOTMART_CHECKOUT_URL) return null;
  // Hotmart acepta `?email=` para pre-rellenar el checkout — reduce el riesgo de
  // que el comprador pague con un correo distinto al de su cuenta (ver
  // 18-VENTA-HOTMART.md, "el bug a evitar"), lo que el webhook necesita para
  // encontrar el perfil correcto.
  if (!email) return HOTMART_CHECKOUT_URL;
  const url = new URL(HOTMART_CHECKOUT_URL);
  url.searchParams.set("email", email);
  return url.toString();
}
