import { Inter } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/components/Contexts/context";
// import GoogleAnalytics from '@/components/GoogleAnalytics'
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieModal from "@/components/UiComponents/CookieModal";
import dynamic from 'next/dynamic';
import OfferModal from "@/components/UiComponents/OfferModal/OfferModal";

const MetaPixel = dynamic(() => import('@/components/MetaPixel'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://qviq.io"),
  title: {
    default: "Qviq - Create Share Connect | Free Website Builder",
    template: "%s | Qviq",
  },
  description:
    "Create your free customizable website with Qviq.io. Easy-to-use website builder with free domain and professionally designed templates.",
  keywords: [
    "free website",
    "free domain",
    "customizable website",
    "website builder",
    "website design",
    "website template",
    "created with qviq.io",
  ],
  openGraph: {
    type: "website",
    url: "https://qviq.io",
    siteName: "Qviq",
    title: "Qviq - Create Share Connect | Free Website Builder",
    description:
      "Create your free customizable website with Qviq.io. Easy-to-use website builder with free domain and professionally designed templates.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qviq Website Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qviq - Create Share Connect | Free Website Builder",
    description:
      "Create your free customizable website with Qviq.io. Easy-to-use website builder with free domain and professionally designed templates.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta
          httpEquiv="cache-control"
          content="no-cache, no-store, must-revalidate"
        />
      </head>
      {/* <GoogleAnalytics GA_MEASUREMENT_ID="G-0YRR6N0X6L" /> */}
      <body>
        <UserContextProvider>
          {/* <div className="flex h-screen w-full"> */}
            <div className="w-full overflow-y-auto" id="hidescroll">
              Hello world
            </div>
            <OfferModal />
            <CookieModal />
          {/* </div> */}
        </UserContextProvider>
        <MetaPixel pixelId="1434397867468507" />
      </body>
      <GoogleAnalytics gaId="G-0YRR6N0X6L" />
    </html>
  );
}
