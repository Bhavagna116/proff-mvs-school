import { ImageResponse } from "next/og";

export const alt = "Prof. MVS Koteswara Rao Memorial School, Guntur";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #ea580c 100%)",
          color: "white",
          padding: "48px 60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: "bold", color: "#fb923c" }}>✨ Admissions Open 2026-27</span>
        </div>

        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.15,
            margin: "0 0 20px 0",
            maxWidth: 1050,
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          Prof. MVS Koteswara Rao Memorial School
        </h1>

        <p
          style={{
            fontSize: 26,
            color: "#fde047",
            fontStyle: "italic",
            margin: "0 0 24px 0",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          &quot;It&apos;s our responsibility to pay back to the SOCIETY&quot;
        </p>

        <p
          style={{
            fontSize: 22,
            color: "#cbd5e1",
            margin: 0,
            textAlign: "center",
          }}
        >
          Guntur, Andhra Pradesh • English Medium Pre-Primary to High School
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
