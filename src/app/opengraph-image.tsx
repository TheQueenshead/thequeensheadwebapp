import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, Littlebury`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share image, drawn from brand colours. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(160deg, #000 0%, #241010 45%, #8E1616 100%)",
          color: "#F8EEDF",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            border: "4px solid #E8C999",
            background: "#8E1616",
            color: "#E8C999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            marginBottom: 32,
          }}
        >
          Q
        </div>
        <div style={{ fontSize: 84, fontWeight: 600 }}>The Queen&rsquo;s Head</div>
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: "#E8C999", marginTop: 16 }}>
          Littlebury · Est. 14th Century
        </div>
        <div style={{ fontSize: 30, marginTop: 40, color: "rgba(248,238,223,0.85)" }}>
          Pub · Restaurant · Rooms
        </div>
      </div>
    ),
    size,
  );
}
