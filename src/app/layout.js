import './globals.css'
import { Layout } from '@/components/dom/Layout'
import StyledComponentsRegistry from '../lib/registry'

export const metadata = {
  title: 'Pictogem',
  description: 'Memory Gacha Demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry><Layout>{children}</Layout></StyledComponentsRegistry>
      </body>
    </html>
  )
}