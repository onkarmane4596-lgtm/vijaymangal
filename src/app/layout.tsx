import type { Metadata, Viewport } from "next";
import { Noto_Serif_Devanagari, Plus_Jakarta_Sans } from "next/font/google";
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
  weight: ["400", "500", "600", "700"],
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
    default: "विजयमंगल आयुर्वेद | डॉ. सुप्रिया श्रीप्रसाद कदम (एम. डी. आयुर्वेद) - आटपाडी",
    template: "%s | विजयमंगल आयुर्वेद, आटपाडी",
  },
  description:
    "विजयमंगल आयुर्वेद, आटपाडी. डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद). शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प. सांधेदुखी, पचनविकार, महिलांचे आरोग्य, पंचकर्म चिकित्सा व वैयक्तिक मार्गदर्शन.",
  keywords: [
    "विजयमंगल आयुर्वेद",
    "Vijaymangal Ayurved",
    "Dr Supriya Kadam Atpadi",
    "आयुर्वेदिक सल्ला आटपाडी",
    "पंचकर्म चिकित्सा",
    "सांधेदुखी आयुर्वेदिक उपचार",
    "Panchakarma Atpadi",
    "आयुर्वेदिक औषधोपचार",
  ],
  authors: [{ name: "डॉ. सुप्रिया श्रीप्रसाद कदम" }],
  creator: "विजयमंगल आयुर्वेद",
  openGraph: {
    type: "website",
    locale: "mr_IN",
    url: "https://vijaymangal-ayurved.vercel.app",
    siteName: "विजयमंगल आयुर्वेद (Vijaymangal Ayurved)",
    title: "विजयमंगल आयुर्वेद | शास्त्रोक्त आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा - आटपाडी",
    description:
      "डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद). आपल्या आरोग्याच्या प्रवासात वैयक्तिक आयुर्वेदिक मार्गदर्शन.",
    images: [
      {
        url: "/images/hero-apothecary.jpg",
        width: 1200,
        height: 675,
        alt: "विजयमंगल आयुर्वेद आटपाडी",
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
      className={`${notoDevanagari.variable} ${plusJakartaSans.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-[#262820]">
        {children}
      </body>
    </html>
  );
}
