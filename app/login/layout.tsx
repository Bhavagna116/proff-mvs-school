import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Prof. MVS Koteswara Rao Memorial School",
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
