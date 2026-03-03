import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artys Music',
  description: 'La première plateforme de streaming équitable',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
