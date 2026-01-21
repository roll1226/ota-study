import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { Link } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";

import { useOTAUpdateSafe } from "../hooks/useOOTAUpdateSafe";
import { useOTAOnForeground } from "../hooks/useOTAOnForeground";
import { useOTAUpdateListener } from "../hooks/useOTAUpdateListener";

export default function HomeScreen() {
  const [isEmbeddedLaunch, setIsEmbeddedLaunch] = useState(
    Updates.isEmbeddedLaunch,
  );
  const [updateId, setUpdateId] = useState(Updates.updateId);
  const [runtimeVersion, setRuntimeVersion] = useState(Updates.runtimeVersion);
  const {
    updateAvailable: updateAvailableUpdateSafe,
    applyUpdate,
    checkUpdate,
  } = useOTAUpdateSafe();
  const { updateAvailable: updateAvailableOnForeground } = useOTAOnForeground();
  const { updateAvailable: updateAvailableListener } = useOTAUpdateListener();

  const shouldShowUpdateBanner =
    updateAvailableUpdateSafe ||
    updateAvailableOnForeground ||
    updateAvailableListener;

  useEffect(() => {
    setIsEmbeddedLaunch(Updates.isEmbeddedLaunch);
    setUpdateId(Updates.updateId);
    setRuntimeVersion(Updates.runtimeVersion);
    checkUpdate();
  }, [checkUpdate]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {shouldShowUpdateBanner && (
        <View style={styles.banner}>
          <Text>新しい更新があります</Text>
          <Button title="更新" onPress={applyUpdate} />
          <Button title="あとで" />
        </View>
      )}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">OTA Info</ThemedText>
        <ThemedText>
          isEmbeddedLaunch: {isEmbeddedLaunch ? "true" : "false"}
        </ThemedText>
        <ThemedText>updateId: {updateId ?? "null"}</ThemedText>
        <ThemedText>runtimeVersion: {runtimeVersion}</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText>OTA update Check</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! OTA Update</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  banner: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
