import { Inter } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/lib/lenis-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VoidStudio - Futuristic Digital Experiences',
  description: 'Creating premium digital experiences that push boundaries',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <LenisProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}