"use client";

import { useEffect } from "react";
import { captureTracking } from "@/lib/tracking";

/** Enregistre UTM et referrer à l'arrivée, sans rien afficher. */
export function TrackingCapture() {
  useEffect(() => {
    captureTracking();
  }, []);
  return null;
}
