import type { Metadata } from 'next';
import { Playfair_Display as PlayfairDisplay, Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/contexts/cart-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import './globals.css';

const playfair = PlayfairDisplay({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: "La boutique de plantes de grand-père | Votre source de confiance pour les plantes en Algérie",
  description: 'Découvrez une large sélection de belles plantes, cactus et fournitures de jardinage. Plantes de qualité avec livraison dans toute l\'Algérie.',
  keywords: 'plantes, cactus, jardinage, Algérie, boutique de plantes, plantes d\'intérieur, plantes d\'extérieur',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr"  suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}