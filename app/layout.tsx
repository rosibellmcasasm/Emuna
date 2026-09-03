import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
