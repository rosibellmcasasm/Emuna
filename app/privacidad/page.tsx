import { LegalPage } from "@/components/app/LegalPage";

export const metadata = { title: "Política de Privacidad — Emuná" };

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de Privacidad" updated="2026-09-02 (borrador)">
      <p>
        ⚠️ <strong>Borrador pendiente de revisión legal.</strong> Este texto es un
        punto de partida honesto, escrito por el equipo de producto — no reemplaza la
        revisión de un abogado local antes del lanzamiento comercial (ver checklist de
        cierre del proyecto).
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Qué datos recopilamos</h2>
      <p>
        Cuando creas tu cuenta recopilamos tu nombre, tu correo electrónico y los datos
        de uso de la app (qué Casos resolviste, tu racha, tus insignias). Si compras el
        acceso completo, el pago lo procesa Hotmart — nosotros no almacenamos los datos
        de tu tarjeta.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Para qué los usamos</h2>
      <p>
        Para darte acceso a los Casos, guardar tu progreso entre dispositivos, y
        enviarte correos relacionados con tu cuenta (bienvenida, recuperación de
        acceso, avisos importantes del producto).
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Con quién los compartimos</h2>
      <p>
        Con proveedores que hacen posible el servicio: ⚠️ [Supabase — base de datos y
        autenticación], ⚠️ [Hotmart — procesamiento de pagos], ⚠️ [Resend — envío de
        correos transaccionales]. No vendemos tus datos a terceros con fines
        publicitarios.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Datos de menores</h2>
      <p>
        Emuná está diseñada para usarse en pareja con un adulto responsable. La cuenta
        se crea con el correo del padre/madre/tutor — no recopilamos datos de contacto
        directos del menor.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Cómo eliminar tus datos</h2>
      <p>
        Puedes solicitar la eliminación de tu cuenta y tus datos escribiendo a ⚠️
        [correo de soporte real]. Procesamos la solicitud en un plazo razonable.
      </p>

      <h2 className="text-lg font-semibold text-txt-primary">Contacto</h2>
      <p>
        ⚠️ [Nombre legal del negocio] · ⚠️ [correo de contacto real] · ⚠️ [país de
        residencia fiscal, para efectos de la ley de protección de datos aplicable].
      </p>
    </LegalPage>
  );
}
