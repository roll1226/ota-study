import * as Updates from "expo-updates";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export function useOTAOnForeground() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener("change", async (nextState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        const result = await Updates.checkForUpdateAsync();
        if (result.isAvailable) {
          setUpdateAvailable(true);
        }
      }
      appState.current = nextState;
    });

    return () => sub.remove();
  }, []);

  return { updateAvailable };
}
