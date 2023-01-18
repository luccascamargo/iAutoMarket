import * as Linking from "expo-linking";

import {
  Container,
  ContentPages,
  Page,
  Title,
  Icon,
  ContentTitle,
  ContentHeader,
} from "./styles";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function More() {
  const handleLink = () => {
    Linking.openURL("https://www.serramotors.com.br/polices")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <ContentHeader elevation={10}>
        <Title>Paginas</Title>
      </ContentHeader>

      <ContentPages>
        <Page style={shadowContent} onPress={handleLink}>
          <Icon name="infocirlce" />
          <ContentTitle>Politica de privacidade</ContentTitle>
        </Page>
      </ContentPages>

      {/* <Title>Socials</Title> */}

      {/* <ContentPages>
        <Page style={shadowContent}>
          <Icon name="star" />
          <ContentTitle>Avalie na App Store</ContentTitle>
        </Page>
      </ContentPages> */}
    </Container>
  );
}
