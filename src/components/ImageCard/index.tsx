import { RectButton } from "react-native-gesture-handler";
import { BoxImage, ContainerImage, ContentStamp, Stamp } from "./styles";

export function ImageCard({ ...props }) {
  return (
    <>
      <RectButton key={props.item.id} {...props}>
        <ContainerImage>
          {props.index === 0 && (
            <ContentStamp>
              <Stamp>Imagem principal</Stamp>
            </ContentStamp>
          )}
          <BoxImage
            source={{ uri: props.item.path || props.item.uri }}
            key={props.item.id}
          />
        </ContainerImage>
      </RectButton>
    </>
  );
}
