import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Button, Platform, Text } from "react-native";
import Styled from "styled-components/native";
import { useOTAOnForeground } from "../hooks/useOTAOnForeground";
import { useOTAUpdateListener } from "../hooks/useOTAUpdateListener";
import { useOTAUpdateSafe } from "../hooks/useOTAUpdateSafe";

export default function HomeScreen() {
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
    checkUpdate();
  }, [checkUpdate]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ReactLogoImage
          source={require("@/assets/images/partial-react-logo.png")}
        />
      }
    >
      {shouldShowUpdateBanner && (
        <Banner>
          <Text>新しい更新があります</Text>
          <Button title="更新" onPress={applyUpdate} />
          <Button title="あとで" />
        </Banner>
      )}
      <ThemedView>
        <ThemedText>OTA update Check</ThemedText>
      </ThemedView>
      <TitleContainer>
        <ThemedText type="title">Welcome! OTA Update</ThemedText>
        <HelloWave />
      </TitleContainer>
      <StepContainer>
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
      </StepContainer>
      <StepContainer>
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
      </StepContainer>
      <StepContainer>
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
      </StepContainer>
    </ParallaxScrollView>
  );
}

const ReactLogoImage = Styled(Image)`
  height: 178px;
  width: 290px;
  bottom: 0px;
  left: 0px;
  position: absolute;
`;

const Banner = Styled.View`
  background-color: #ffd700;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const StepContainer = Styled(ThemedView)`
  gap: 8px;
  margin-bottom: 8px;
`;

const TitleContainer = Styled(ThemedView)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
