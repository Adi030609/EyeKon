// pages/index.js or app/page.js (depending on your Next.js router)
"use client";
import { useEffect, useRef } from "react";
import StarBackground from "@/components/stars";

export default function Home() {
  return (
    <div>
      <StarBackground />
    </div>
  );
}
