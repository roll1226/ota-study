import * as Updates from "expo-updates";
import { useEffect, useRef, useState } from "react";

export function useOTAUpdateListener(intervalMs = 5 * 60 * 1000) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  const check = async () => {
    try {
      const result = await Updates.checkForUpdateAsync();
      if (result.isAvailable) {
        setUpdateAvailable(true);
      }
    } catch {}
  };

  useEffect(() => {
    check();

    timerRef.current = setInterval(check, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [intervalMs]);

  return { updateAvailable };
}
