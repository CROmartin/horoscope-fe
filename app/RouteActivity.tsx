"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RouteActivity() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (previousPath.current && previousPath.current !== pathname) {
      const activity = parseInt(localStorage.getItem("activity") || "0", 10) + 1;
      if (activity === 5) {
        window.location.reload();
      }
      localStorage.setItem("activity", String(activity));
    }
    previousPath.current = pathname;
  }, [pathname]);

  return null;
}
