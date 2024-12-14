import localFont from "next/font/local";
import "./globals.css";
import Navigation from './components/Navigation';
import { Poppins } from '@next/font/google';
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "DevForge - Learn Programming by Building",
  description: "Master programming through hands-on project-based learning",
};

export default function RootLayout({ children }) {
  return (
  <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  </ClerkProvider>
    
  );
}
