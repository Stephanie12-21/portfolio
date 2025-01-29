import "./globals.css";
import { Work_Sans } from "next/font/google";

const jersey = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jersey",
  display: "swap",
});

export const metadata = {
  title: "Stéphanie MAMINIAINA",
  description: "Ceci est mon portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jersey.variable} font-jersey antialiased`}>
        {children}
      </body>
    </html>
  );
}
