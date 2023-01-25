import "styled-components";
import theme from "../Globals/styles/theme";

declare module "styled-components" {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {
    colors: {
      primary: "#06b6d4";
      primary_hover: "#67e8f9";
      secondary: "#a5f3fc";
      title: "#1c1917";
      text: "#27272a";
      white: "#EDEDED";
      background: "#fafaf9";
      green: "#22c55e";
      error: "#ef4444";
    };
    fonts: {
      light: "Sora_300Light";
      regular: "Sora_400Regular";
      medium: "Sora_500Medium";
      semiBold: "Sora_600SemiBold";
      bold: "Sora_700Bold";
    };
  }
}
