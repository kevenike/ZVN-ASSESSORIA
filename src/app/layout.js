import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"; // Importe a fonte Inter

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ // Configure a fonte Inter
  variable: "--font-inter", // Defina uma variável CSS para a fonte Inter
  subsets: ["latin"],
  display: "swap", // Opcional: define como a fonte é exibida enquanto carrega
});

export const metadata = { // Removida anotação de tipo ": Metadata"
  title: "ZVN Assessoria Esportiva", // Título da sua landing page
  description: "Transforme seu potencial em resultados com Giovani Zavan.", // Descrição da sua landing page
};

// Removida anotação de tipo ": Readonly<{ children: React.ReactNode; }>"
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}