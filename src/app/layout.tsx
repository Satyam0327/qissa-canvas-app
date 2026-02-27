import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qissa — Every Canvas Holds a Story",
  description:
    "Qissa is an immersive art canvas where every poster tells a story. Explore, curate, and unfold visual narratives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#00f0ff",
          colorBackground: "#0f0f18",
          colorText: "#f0f0f5",
          colorTextSecondary: "#8888a0",
          colorInputBackground: "#0a0a0f",
          colorInputText: "#f0f0f5",
          borderRadius: "12px",
          fontFamily: "'Inter', sans-serif",
        },
        elements: {
          card: {
            background: "#0f0f18",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
          },
          formButtonPrimary: {
            background: "linear-gradient(135deg, #00f0ff, #7b2ff7)",
            color: "#000",
            fontWeight: 700,
          },
          socialButtonsBlockButton: {
            background: "#0a0a0f",
            border: "1px solid rgba(255,255,255,0.06)",
          },
          footerActionLink: {
            color: "#00f0ff",
          },
        },
      }}
    >
      <CartProvider>
        <html lang="en">
          <body>
            {children}
            <CartDrawer />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
