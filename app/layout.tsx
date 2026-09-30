import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mvsschool-mandapeta.edu.in";

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Prof. MVS Koteswara Rao Memorial School | Mandapeta",
    template: "%s | Prof. MVS Koteswara Rao Memorial School",
  },
  description:
    "Official portal for Prof. MVS Koteswara Rao Memorial School, Mandapeta, Andhra Pradesh. Offering English medium pre-primary, primary, middle & high school education with holistic development and modern facilities. Admissions Open 2026-27.",
  applicationName: "Prof. MVS Koteswara Rao Memorial School",
  authors: [
    {
      name: "Prof. MVS Koteswara Rao Memorial School",
      url: baseUrl,
    },
  ],
  generator: "Next.js",
  keywords: [
    "Prof. MVS Koteswara Rao Memorial School",
    "MVS School Mandapeta",
    "MVS Memorial School Mandapeta",
    "Best school in Mandapeta",
    "Schools in Mandapeta",
    "English Medium School Mandapeta",
    "Primary School Mandapeta",
    "High School Mandapeta",
    "School admissions Mandapeta",
    "Admissions Open 2026-27 Mandapeta",
    "Quality education Mandapeta",
    "Konaseema schools",
    "East Godavari schools Andhra Pradesh",
    "Top rated schools in Mandapeta AP",
  ],
  creator: "Prof. MVS Koteswara Rao Memorial School",
  publisher: "Prof. MVS Koteswara Rao Memorial School",
  category: "education",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Prof. MVS Koteswara Rao Memorial School",
    title: "Prof. MVS Koteswara Rao Memorial School | Mandapeta",
    description:
      "Continuing the legacy of quality education. Nurturing the leaders of tomorrow with holistic development, values, and modern curriculum in Mandapeta, AP. Admissions Open 2026-27.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Prof. MVS Koteswara Rao Memorial School Crest Logo",
      },
      {
        url: "/event-1.jpg",
        width: 1200,
        height: 630,
        alt: "Students and campus activities at Prof. MVS Koteswara Rao Memorial School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. MVS Koteswara Rao Memorial School | Mandapeta",
    description:
      "Quality English Medium education in Mandapeta, AP. Admissions Open 2026-27. Nurturing future leaders.",
    images: ["/event-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
      { url: "/favicon.ico" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/logo.png"],
  },
  verification: {
    google: "googlef4595adaa8cfbd74",
  },
  other: {
    "google-site-verification": "googlef4595adaa8cfbd74",
    "geo.region": "IN-AP",
    "geo.placename": "Mandapeta",
    "geo.position": "16.8687;81.9312",
    "ICBM": "16.8687, 81.9312",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["School", "EducationalOrganization"],
      "@id": `${baseUrl}/#school`,
      name: "Prof. MVS Koteswara Rao Memorial School",
      alternateName: [
        "MVS School Mandapeta",
        "MVS Memorial School",
        "Prof. MVS Koteswara Rao Memorial School",
      ],
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      image: `${baseUrl}/event-1.jpg`,
      description:
        "Prof. MVS Koteswara Rao Memorial School in Mandapeta offers holistic, high-quality English medium education from pre-primary through high school.",
      slogan: "It's our responsibility to pay back to the SOCIETY",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Prof. MVS Koteswara Rao Memorial School",
        addressLocality: "Mandapeta",
        addressRegion: "Andhra Pradesh",
        postalCode: "533308",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 16.8687,
        longitude: 81.9312,
      },
      telephone: "+91-9849532787",
      email: "mvskchool22754@gmail.com",
      currenciesAccepted: "INR",
      paymentAccepted: "Bank Transfer, Cash",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:30",
          closes: "16:30",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Academic Programs",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Pre-Primary & Nursery Education",
              description:
                "Foundational early childhood education and developmental activities.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Primary & Middle School (English Medium)",
              description:
                "Comprehensive curriculum focusing on literacy, numeracy, science, and moral values.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "High School State Board & Digital Learning",
              description:
                "Rigorous academic preparation with digital classroom learning and board examination guidance.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Prof. MVS Koteswara Rao Memorial School",
      description:
        "Official portal for Prof. MVS Koteswara Rao Memorial School, Mandapeta",
      publisher: {
        "@id": `${baseUrl}/#school`,
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


