import { Mail } from "lucide-react";
import { LegalPage } from "@/components/app/LegalPage";
import { IconChip } from "@/components/app/IconChip";

export const metadata = { title: "Contacto — Emuná" };

export default function ContactoPage() {
  return (
    <LegalPage title="Contacto y soporte" updated="2026-09-02">
      <p>
        ¿Preguntas sobre un Caso, tu compra o tu acceso? Escríbenos — un humano
        responde, no un bot.
      </p>

      <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border-default bg-surface-primary p-4">
        <IconChip tone="gold" size={40}>
          <Mail size={18} color="var(--brand-primary)" aria-hidden="true" />
        </IconChip>
        <div>
          <p className="text-[13px] text-txt-tertiary">Correo de soporte</p>
          <p className="text-[15px] font-semibold text-txt-primary">
            ⚠️ [correo de soporte real, pendiente de configurar]
          </p>
        </div>
      </div>

      <p>
        Tiempo de respuesta estimado: ⚠️ [definir SLA, ej. &ldquo;dentro de 24-48
        horas hábiles&rdquo;] — se confirma al montar el soporte real en una sesión
        posterior.
      </p>
    </LegalPage>
  );
}
