import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
/*import { Analytics } from '@vercel/analytics/next'*/
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Ove Clothes | Ropa Urbana Argentina',
  description: 'Ropa urbana minimalista hecha en Argentina. Diseños modernos, calidad premium. Envíos a todo el país.',
  icons: {
    icon: [
      {
        url: '/Logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/Logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/Logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
