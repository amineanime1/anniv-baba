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
  title: "Grandpa's Plant Shop | Your Trusted Source for Plants in Algeria",
  description: 'Discover a wide selection of beautiful plants, cacti, and gardening supplies. Quality plants with delivery across Algeria.',
  keywords: 'plants, cacti, gardening, Algeria, plant shop, indoor plants, outdoor plants',
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