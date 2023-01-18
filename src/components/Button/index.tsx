import { Spinner } from "native-base";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function Button({ title, ...rest }: ButtonProps) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <Title>
        {rest.disabled === true ? (
          <Spinner color={theme.colors.white} size="sm" />
        ) : (
          title
        )}
      </Title>
    </Container>
  );
}
