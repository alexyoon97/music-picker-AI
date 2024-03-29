import type { AppProps } from "next/app"
import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"
import "@/styles/loader.css"
import "@/styles/loader_idle.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </ThemeProvider>
    </>
  )
}
