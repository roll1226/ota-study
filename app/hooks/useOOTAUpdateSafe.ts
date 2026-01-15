import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export function useOTAUpdateSafe() {
  const [ready, setReady] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    (async () => {
      const res = await Updates.checkForUpdateAsync();
      if (res.isAvailable) {
        await Updates.fetchUpdateAsync();
        setUpdateAvailable(true);
      }
    })();
  }, [ready]);

  return {
    updateAvailable,
    applyUpdate: () => Updates.reloadAsync(),
  };
}
