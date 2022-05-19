import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";

type TVector =
  | "feather"
  | "fontawesome"
  | "ionicons"
  | "materialCI"
  | "antDesign";

interface IProps {
  size?: number;
  style?: StyleProp<TextStyle>;
  name?: any;
  color?: string;
  as?: TVector;
  onPress?: () => void;
}

const Vector = ({
  size,
  style,
  name,
  color,
  as,
  onPress,
}: IProps): JSX.Element => {
  const props = {
    name,
    size,
    style,
    color,
    onPress,
  };

  if (as === "feather") {
    return <Feather {...props} />;
  }
  if (as === "ionicons") {
    return <Ionicons {...props} />;
  }

  if (as === "materialCI") {
    return <MaterialCommunityIcons {...props} />;
  }
  if (as === "antDesign") {
    return <AntDesign {...props} />;
  }
  return <FontAwesome {...props} />;
};

export default Vector;
