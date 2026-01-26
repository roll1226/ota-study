import * as Updates from "expo-updates";
import { useCallback, useState } from "react";

export function useOTAUpdateSafe() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const checkUpdate = useCallback(async () => {
    try {
      const result = await Updates.checkForUpdateAsync();
      setUpdateAvailable(result.isAvailable);
    } catch (e) {
      console.warn("check update failed", e);
    }
  }, []);

  const applyUpdate = useCallback(async () => {
    try {
      setIsFetching(true);
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (e) {
      console.warn("apply update failed", e);
    } finally {
      setIsFetching(false);
    }
  }, []);

  return {
    updateAvailable,
    isFetching,
    checkUpdate,
    applyUpdate,
  };
}
