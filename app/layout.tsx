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
  title: "AWS Student Community Day Yavatmal 2026",
  description: "Join the largest student-run AWS cloud conference in Yavatmal. Discover, learn, and connect with industry leaders, AWS experts, and fellow student developers.",
  keywords: ["AWS", "AWS Student Community Day", "Yavatmal", "Cloud Computing", "JDIET", "AWS Club", "AWS Community Day"],
  authors: [{ name: "AWS Student Community Yavatmal" }],
  metadataBase: new URL("https://yavatmal.awsstudents.community"), // Placeholder URL
  openGraph: {
    title: "AWS Student Community Day Yavatmal 2026",
    description: "Join the largest student-run AWS cloud conference in Yavatmal. Discover, learn, and connect with industry leaders and experts.",
    url: "https://yavatmal.awsstudents.community",
    siteName: "AWS Student Community Day Yavatmal",
    images: [
      {
        url: "/images/og-image.png",
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
    title: "AWS Student Community Day Yavatmal 2026",
    description: "Join the largest student-run AWS cloud conference in Yavatmal. Discover, learn, and connect with industry leaders and experts.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
      </body>
    </html>
  );
}
