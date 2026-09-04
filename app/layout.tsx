import type { Metadata } from "next";
import "./globals.css";
import "./preview.css";
import "./home.css";
import "./akilli-civata/akilli-civata.css";
import { motionBootScript } from "@/lib/motion";

const SITE_URL = "https://ucersoft.com.tr";
const TITLE = "Üçersoft | XStudio ve Akıllı Civata";
const DESCRIPTION =
  "Üçersoft'un XStudio endüstriyel görüntü işleme platformunu ve kablosuz Akıllı Civata bağlantı izleme ürününü keşfedin.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Üçersoft",
  authors: [{ name: "ÜÇERSOFT Yazılım Ltd. Şti." }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Üçersoft",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-ucersoft.jpg", width: 1200, height: 630, alt: "Üçersoft — endüstriyel görüntü işleme ve bağlantı izleme" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-ucersoft.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
        {children}
      </body>
    </html>
  );
}
