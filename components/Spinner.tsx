import { EvilIcons as Icon } from "@expo/vector-icons";
import React from "react";
import { Animated, Easing } from "react-native";

export default function Spinner(props: any) {
  const rotation = new Animated.Value(0);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ rotate: spin }],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name="spinner-3" brand {...props} />
    </Animated.View>
  );
}
