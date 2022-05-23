import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IToken } from "types";
import { SafeAreaView } from "react-native-safe-area-context";
import Vector from "../assets/vectors";
import { SIZES, FONTS } from "../constants/Assets";
import { formatToUSD } from "../helpers";
import Colors from "../constants/Colors";
import Graph from "../components/Chart/Graph";

const TokenPrice = ({
  token,
  style,
}: {
  token: IToken;
  style?: Animated.WithAnimatedObject<ViewStyle>;
}) => {
  return (
    <Animated.View style={style}>
      <Text
        style={{
          fontSize: SIZES.medium,
          fontFamily: FONTS.semibold,
          paddingVertical: SIZES.p6,
        }}
      >
        {formatToUSD(token?.balance || 1, token.name)}
      </Text>
    </Animated.View>
  );
};

const TokenDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = route.params as IToken;
  const hasDecreased = token.status === "D";

  const scrollY = new Animated.Value(0);

  return (
    <SafeAreaView>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        decelerationRate={"normal"}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View>
          <Animated.View
            style={{
              paddingHorizontal: SIZES.p20,
              paddingVertical: SIZES.p6,
              backgroundColor: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [Colors.transparent, "whitesmoke"],
                extrapolate: "clamp",
              }),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => navigation.goBack()}>
                <Vector name="arrowleft" as="antDesign" size={24} />
              </Pressable>
              <TokenPrice
                token={token}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: scrollY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                }}
              />
            </View>
          </Animated.View>
        </View>
        <View
          style={{ paddingBottom: SIZES.p15, paddingHorizontal: SIZES.p20 }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontFamily: FONTS.regular,
            }}
          >
            {token.name} price
          </Text>
          <TokenPrice
            token={token}
            style={{
              height: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [35, 0],
                extrapolate: "clamp",
              }),
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Vector
                as="feather"
                size={16}
                name={hasDecreased ? "arrow-down-right" : "arrow-up-right"}
                style={{ color: hasDecreased ? Colors.red : Colors.green }}
              />
              <Text
                style={{
                  fontSize: SIZES.font,
                  fontFamily: FONTS.monoRegular,
                  color: hasDecreased ? Colors.red : Colors.green,
                }}
              >
                {formatToUSD(
                  (token.priceUSD * 100) / Number(token.rate),
                  token.name
                )}
              </Text>
            </View>
            <Text
              style={{
                fontSize: SIZES.font,
                fontFamily: FONTS.monoRegular,
                color: hasDecreased ? Colors.red : Colors.green,
                marginLeft: SIZES.p6,
              }}
            >
              ({token.rate}%)
            </Text>
          </View>
        </View>
        <Graph />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default TokenDetails;
