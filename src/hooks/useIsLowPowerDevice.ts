import { useMemo } from "react";

/**
 * Rough, best-effort heuristic for "should we serve the lighter experience".
 * Combines viewport width, core count, and (when available) network
 * quality/save-data. Used only to pick a cheaper rendering path for the
 * scroll sequence — never to hide content.
 */
export function useIsLowPowerDevice(): boolean {
  return useMemo(() => {
    if (typeof window === "undefined") return false;

    const isNarrow = window.innerWidth < 640;
    const lowCores =
      "hardwareConcurrency" in navigator && navigator.hardwareConcurrency <= 4;

    type NetworkInformation = {
      saveData?: boolean;
      effectiveType?: string;
    };
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    const saveData = connection?.saveData ?? false;
    const slowNetwork = ["slow-2g", "2g", "3g"].includes(
      connection?.effectiveType ?? ""
    );

    return (isNarrow && lowCores) || saveData || slowNetwork;
  }, []);
}
