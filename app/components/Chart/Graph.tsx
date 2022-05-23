import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { mixPath, useVector } from "react-native-redash";

import { GraphIndex } from "types";
import { SIZES } from "../../constants/Assets";
import Cursor from "./Cursor";
import { PRICE_PERIODS } from "../../constants/Dummies";

const { width: SIZE } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SELECTION_WIDTH = SIZE - 32;
const BUTTON_WIDTH = (SIZE - 32) / PRICE_PERIODS.length;

const Graph = () => {
  const translation = useVector();
  const transition = useSharedValue(0);
  const previous = useSharedValue<GraphIndex>(0);
  const current = useSharedValue<GraphIndex>(0);

  const animatedProps = useAnimatedProps(() => {
    const previousPath = PRICE_PERIODS[previous.value].data.path;
    const currentPath = PRICE_PERIODS[current.value].data.path;
    return {
      d: mixPath(transition.value, previousPath, currentPath),
    };
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(BUTTON_WIDTH * current.value) }],
  }));

  return (
    <View style={styles.container}>
      <View>
        <Svg width={SIZE} height={SIZE}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="#264653"
            strokeWidth={3}
          />
        </Svg>
        <Cursor translation={translation} index={current} />
      </View>
      <View style={styles.selection}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.backgroundSelection, style]} />
        </View>
        {PRICE_PERIODS.map((graph, index) => {
          return (
            <TouchableWithoutFeedback
              key={graph.value}
              onPress={() => {
                previous.value = current.value;
                transition.value = 0;
                current.value = index as GraphIndex;
                transition.value = withTiming(1);
              }}
            >
              <Animated.View style={[styles.labelContainer]}>
                <Text style={styles.label}>{graph.label}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: SIZES.p20,
    overflow: "hidden",
    borderRadius: 10,
  },
  backgroundSelection: {
    backgroundColor: "#f3f3f3",
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  selection: {
    flexDirection: "row",
    width: SELECTION_WIDTH,
    alignSelf: "center",
  },
  labelContainer: {
    padding: 16,
    width: BUTTON_WIDTH,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Graph;
