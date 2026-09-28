import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Proff. MVS Koteswara Rao Memorial Public School",
  description: "Secure login portal for school administrators and staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
