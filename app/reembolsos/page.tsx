import { LegalPage } from "@/components/app/LegalPage";

export const metadata = { title: "Política de Reembolso — Emuná" };

export default function ReembolsosPage() {
  return (
    <LegalPage title="Política de Reembolso" updated="2026-09-02 (borrador)">
      <p>
        ⚠️ <strong>Pendiente de configurar en Hotmart.</strong> El plazo que se
        describe aquí (7 días) debe coincidir exactamente con lo configurado en el
        producto de Hotmart antes del lanzamiento — ver Sesión 6 del proyecto.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">
        La Garantía del Primer Caso Resuelto
      </h2>
      <p>
        Si dentro de los primeros 7 días desde tu compra sientes que tú y tu hijo no
        resolvieron su primer Caso de verdad, escríbenos a ⚠️ [correo de soporte real]
        y te devolvemos el 100% de tu pago. Sin preguntas, sin formularios.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Cómo se procesa</h2>
      <p>
        El reembolso se solicita directamente desde tu compra en Hotmart o
        escribiéndonos a soporte. Hotmart gestiona la devolución a tu método de pago
        original según su propio plazo de procesamiento.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Después del reembolso</h2>
      <p>
        Al procesarse el reembolso, tu acceso a los Casos pagos se desactiva; el
        Módulo 1 gratuito sigue disponible sin costo, como siempre.
      </p>
    </LegalPage>
  );
}
