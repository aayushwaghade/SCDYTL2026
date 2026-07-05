import type { Metadata, Viewport } from "next";
import { Bai_Jamjuree } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "sonner";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bai-jamjuree",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#040308",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AWS Student Community Day Yavatmal 2026 | AWS  Student Builder Group JDIET",
  description: "Register for AWS Student Community Day Yavatmal 2026 (SCD Yavatmal 2026). Hosted by AWS Student Builder Group JDIET & AWS Cloud Club JDIET on August 22, 2026. Join the premier student-led AWS Community Day Yavatmal cloud event in Vidarbha!",
  keywords: [
    "AWS Student Community Day",
    "AWS Student Community Day Yavatmal 2026",
    "SCD Yavatmal 2026",
    "AWS SCD 2026 Yavatmal",
    "SCD Yavatmal",
    "AWS Community Day Yavatmal",
    "AWS Student Community Day 2026",
    "AWS Yavatmal 2026",
    "AWS Student Builder Group JDIET",
    "AWS SBG JDIET",
    "AWS Student Builder Group",
    "Student Builder Group Yavatmal",
    "AWS Cloud Club JDIET",
    "AWS Cloud Club Yavatmal",
    "Cloud Club JDIET Yavatmal",
    "JDIET AWS Community",
    "JDIET Yavatmal",
    "AWS Student Community Day Yachtmar 2026",
    "AWS Yachtmar 2026",
    "SCD Yachtmar 2026",
    "Pranav Shinde",
    "Cloud Computing Yavatmal"
  ],
  authors: [{ name: "AWS Student Community Yavatmal" }],
  metadataBase: new URL("https://scdytl-2026.vercel.app"),
  alternates: {
    canonical: "https://scdytl-2026.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AWS Student Community Day Yavatmal 2026 | AWS Cloud Club JDIET",
    description: "Register for AWS Student Community Day Yavatmal 2026 (SCD Yavatmal 2026). Hosted by AWS Student Builder Group JDIET & AWS Cloud Club JDIET on August 22, 2026. Join the premier student-led AWS Community Day Yavatmal cloud event in Vidarbha!",
    url: "https://scdytl-2026.vercel.app",
    siteName: "AWS Student Community Day Yavatmal",
    images: [
      {
        url: "/logos/aws-logo.png",
        width: 1200,
        height: 630,
        alt: "AWS Student Community Day Yavatmal 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Community Day Yavatmal 2026 | AWS Cloud Club JDIET",
    description: "Register for AWS Student Community Day Yavatmal 2026 (SCD Yavatmal 2026). Hosted by AWS Student Builder Group JDIET & AWS Cloud Club JDIET on August 22, 2026. Join the premier student-led AWS Community Day Yavatmal cloud event in Vidarbha!",
    images: ["/logos/aws-logo.png"],
  },
  icons: {
    icon: "/logos/aws-logo.png",
    shortcut: "/logos/aws-logo.png",
    apple: "/logos/aws-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased dark ${baiJamjuree.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={{ fontFamily: "var(--font-bai-jamjuree), sans-serif" }}
      >
        <Providers>
          {children}
          <Toaster position="bottom-right" theme="dark" richColors />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "AWS Student Community Day Yavatmal (Yachtmar) 2026",
              "startDate": "2026-08-22T09:00:00+05:30",
              "endDate": "2026-08-22T18:00:00+05:30",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Jawaharlal Darda Institute of Engineering and Technology (JDIET)",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "JDIET Campus, Lohara",
                  "addressLocality": "Yavatmal",
                  "addressRegion": "Maharashtra",
                  "postalCode": "445001",
                  "addressCountry": "IN"
                }
              },
              "image": [
                "https://scdytl-2026.vercel.app/logos/aws-logo.png",
                "https://scdytl-2026.vercel.app/logos/scd-logo.png"
              ],
              "description": "Join the premier student-led cloud computing event in Yavatmal (Yachtmar). Learn from AWS experts, discover cloud innovations, and connect with developers.",
              "organizer": {
                "@type": "Organization",
                "name": "AWS Student Builder Group & AWS Club, JDIET",
                "url": "https://scdytl-2026.vercel.app"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://scdytl-2026.vercel.app/#tickets",
                "price": "200",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
