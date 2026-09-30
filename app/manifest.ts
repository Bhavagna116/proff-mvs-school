import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prof. MVS Koteswara Rao Memorial School",
    short_name: "MVS Memorial School",
    description:
      "Official Portal of Prof. MVS Koteswara Rao Memorial School, Mandapeta - Nurturing future leaders through quality English medium education.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ea580c",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
