import React from 'react'
import './styles.css'
import { Providers } from './providers'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
