import React, { ReactNode } from "react";
import { SafeAreaView, StyleProp, View, ViewStyle } from "react-native";

type SafeViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function SafeView({ children, style }: SafeViewProps) {
  return (
    <SafeAreaView>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}
