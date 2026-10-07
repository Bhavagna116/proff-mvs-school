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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mvsschool.com";

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Prof. MVS Koteswara Rao Memorial School | Guntur",
    template: "%s | Prof. MVS Koteswara Rao Memorial School",
  },
  description:
    "Official portal for Prof. MVS Koteswara Rao Memorial School, Guntur, Andhra Pradesh. Offering English medium pre-primary, primary, middle & high school education with holistic development and modern facilities. Admissions Open 2026-27.",
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
    "Prof. M.V.S. Koteswara Rao Memorial Public School",
    "MVS School Guntur",
    "MVS Memorial School Guntur",
    "Best school in Guntur",
    "Schools in Guntur",
    "English Medium School Guntur",
    "Primary School Guntur",
    "High School Guntur",
    "School admissions Guntur",
    "Admissions Open 2026-27 Guntur",
    "Quality education Guntur",
    "Guntur schools",
    "Guntur schools Andhra Pradesh",
    "Top rated schools in Guntur AP",
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
    title: "Prof. MVS Koteswara Rao Memorial School | Guntur",
    description:
      "Continuing the legacy of quality education. Nurturing the leaders of tomorrow with holistic development, values, and modern curriculum in Guntur, AP. Admissions Open 2026-27.",
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
    title: "Prof. MVS Koteswara Rao Memorial School | Guntur",
    description:
      "Quality English Medium education in Guntur, AP. Admissions Open 2026-27. Nurturing future leaders.",
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
    "geo.placename": "Guntur",
    "geo.position": "16.3067;80.4365",
    "ICBM": "16.3067, 80.4365",
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
        "Prof. M.V.S. Koteswara Rao Memorial Public School",
        "MVS School Guntur",
        "MVS Memorial School",
        "Prof. MVS Koteswara Rao Memorial School",
      ],
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      image: `${baseUrl}/event-1.jpg`,
      description:
        "Prof. MVS Koteswara Rao Memorial School in Guntur offers holistic, high-quality English medium education from pre-primary through high school.",
      slogan: "It's our responsibility to pay back to the SOCIETY",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sundaraiah Nagar, Adavithakkellapadu Road",
        addressLocality: "Guntur",
        addressRegion: "Andhra Pradesh",
        postalCode: "522006",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 16.3067,
        longitude: 80.4365,
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
        "Official portal for Prof. MVS Koteswara Rao Memorial School, Guntur",
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


