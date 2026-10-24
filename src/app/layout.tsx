import type { Metadata, Viewport } from "next";
import { Noto_Serif_Devanagari, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { FloatingActionWidget } from "@/components/public/FloatingActionWidget";
import "./globals.css";

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#183D2B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vijaymangal-ayurved.vercel.app"),
  title: {
    default: "Vijaymangal Ayurved | Dr. Supriya S. Kadam, M.D. (Ayurveda) - Atpadi",
    template: "%s | Vijaymangal Ayurved, Atpadi",
  },
  description:
    "Vijaymangal Ayurved, Atpadi. Consulting Physician: Dr. Supriya Shreeprasad Kadam, M.D. (Ayurveda). Classical Ayurvedic medicine, Panchakarma therapies, pulse diagnosis, and personalized treatment courses.",
  keywords: [
    "Vijaymangal Ayurved",
    "विजयमंगल आयुर्वेद",
    "Dr Supriya Kadam Atpadi",
    "Dr. Supriya Shreeprasad Kadam",
    "Ayurvedic Clinic Atpadi",
    "Panchakarma Center Sangli",
    "Sandhivata Ayurvedic Treatment",
    "Classical Ayurveda Maharashtra",
  ],
  authors: [{ name: "Dr. Supriya Shreeprasad Kadam" }],
  creator: "Vijaymangal Ayurved",
  openGraph: {
    type: "website",
    locale: "mr_IN",
    url: "https://vijaymangal-ayurved.vercel.app",
    siteName: "Vijaymangal Ayurved (विजयमंगल आयुर्वेद)",
    title: "Vijaymangal Ayurved | Classical Ayurvedic Care & Panchakarma - Atpadi",
    description:
      "Dr. Supriya Shreeprasad Kadam, M.D. (Ayurveda). Authentic classical Ayurveda, personalized consultations, and structured wellness courses.",
    images: [
      {
        url: "/images/hero-apothecary.jpg",
        width: 1200,
        height: 675,
        alt: "Vijaymangal Ayurved Atpadi",
      },
    ],
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mr"
      className={`${notoDevanagari.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-[#262820] font-sans selection:bg-[#6517a3] selection:text-white">
        {children}
        <FloatingActionWidget />
      </body>
    </html>
  );
}
