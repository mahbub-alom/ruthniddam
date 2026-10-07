import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: {
    template: '%s | Ruth Niddam — Facialiste Paris 8',
    default: 'Ruth Niddam — Facialiste Paris 8 | L\'Excellence du Soin Visage Haute Couture'
  },
  description: 'Au 32 Avenue Matignon Paris 8, Ruth Niddam sublime votre visage grâce aux massages Kobido d\'exception, au Gua Sha My Jeaneth™ et à la haute technologie esthétique.',
  keywords: ['Ruth Niddam', 'Facialiste Paris', 'Facialiste Paris 8', 'Kobido Paris', 'Gua Sha My Jeaneth', 'Soin visage luxe', 'Avenue Matignon'],
  openGraph: {
    title: 'Ruth Niddam — Facialiste Paris 8',
    description: 'L\'Excellence du Soin Visage Haute Couture à Paris 8ème.',
    url: 'https://ruthniddam.fr',
    siteName: 'Ruth Niddam Paris',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDFBF7] text-[#1C1917]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
