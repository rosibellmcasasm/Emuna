import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Emuná — El expediente que enseña a tu hijo a defender su fe",
  description:
    "Casos detectivescos de 10 minutos a la semana, resueltos en pareja padre-hijo, que convierten la fe de tu hijo en un escudo lógico contra el escepticismo del mundo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${baloo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface-base text-txt-primary font-body">
        {/* reducedMotion="user" respeta prefers-reduced-motion del sistema operativo en
            TODAS las animaciones de motion/react de la app, sin tener que acordarse de
            envolver cada pantalla — hallazgo de la auditoría visual del 2026-09-08. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
