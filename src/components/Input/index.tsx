import { TextInputProps } from "react-native";
import { Container } from "./styles";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function Input({ ...rest }: TextInputProps) {
  return <Container {...rest} style={shadowContent}></Container>;
}
