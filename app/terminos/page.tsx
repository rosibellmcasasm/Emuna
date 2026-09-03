import { LegalPage } from "@/components/app/LegalPage";

export const metadata = { title: "Términos y Condiciones — Emuná" };

export default function TerminosPage() {
  return (
    <LegalPage title="Términos y Condiciones" updated="2026-09-02 (borrador)">
      <p>
        ⚠️ <strong>Borrador pendiente de revisión legal.</strong> Válido como punto de
        partida honesto; se recomienda validación de un abogado local antes de vender.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Qué es Emuná</h2>
      <p>
        Emuná es una app educativa donde padres/madres e hijos de 8 a 12 años resuelven
        juntos &ldquo;Casos&rdquo; semanales de apologética cristiana (evidencia y
        lógica sobre por qué tiene sentido creer). El Módulo 1 (primeros Casos) es
        gratuito, sin necesidad de tarjeta. El acceso completo a los 52 Casos se vende
        mediante un pago único de $29, procesado por Hotmart.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Qué NO promete Emuná</h2>
      <p>
        Emuná es una herramienta educativa de apoyo — no reemplaza la formación
        espiritual de tu comunidad de fe ni garantiza resultados específicos en las
        convicciones de tu hijo. El contenido refleja una perspectiva de cristianismo
        mero, sin postura interdenominacional.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Condiciones de uso</h2>
      <p>
        La cuenta es personal e intransferible. Nos reservamos el derecho de suspender
        cuentas que hagan un uso indebido de la plataforma (compartir accesos
        masivamente, intentos de fraude en el pago, etc.).
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Pagos y acceso</h2>
      <p>
        El pago único de $29 otorga acceso de por vida a los 52 Casos disponibles al
        momento de la compra y a las actualizaciones futuras del mismo contenido. El
        pago se procesa a través de Hotmart; su comprobante de compra es válido como
        prueba de la transacción.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Ley aplicable</h2>
      <p>
        ⚠️ [Estos términos se rigen por las leyes de — país de residencia fiscal del
        negocio, a confirmar]. Cualquier disputa se resolverá en los tribunales de esa
        jurisdicción.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Contacto</h2>
      <p>⚠️ [correo de contacto real] · ⚠️ [nombre legal del negocio]</p>
    </LegalPage>
  );
}
