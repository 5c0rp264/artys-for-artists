import type { Metadata } from 'next';
import { Inter, Jost } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import '../globals.css';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-jost',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Artys Music — La première plateforme de streaming équitable',
  description: 'Gagne ta vie avec tes fans, pas avec les algos. La première plateforme de streaming équitable où chaque fan te rapporte un revenu mensuel.',
  keywords: ['streaming', 'artistes indépendants', 'revenus musicaux', 'Royaltips', 'Artys'],
  openGraph: {
    title: 'Artys Music — Streaming équitable',
    description: '1 000 fans. 36 000 à 72 000 $ par an.',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${jost.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
