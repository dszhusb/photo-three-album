import './globals.css'

export const metadata = {
  title: 'Pictogem',
  description: 'Memory Gacha Demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}