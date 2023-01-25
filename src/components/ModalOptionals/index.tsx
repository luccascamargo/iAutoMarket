import { Spinner } from "native-base";
import { useState } from "react";
import { Text } from "react-native";
import { useTheme } from "styled-components";
import { Input } from "../Input";
import {
  Container,
  ContentHeader,
  SelectButton,
  Separator,
  ListOptions,
  Option,
  TextOption,
  TextSelect,
} from "./styles";

export function ModalOptionals({
  changeModal,
  changeValue,
  value,
  dataItems,
  loading,
}: any) {
  const [inputText, setInputText] = useState("");
  const theme = useTheme();

  function handleSelectOption(option: any) {
    const itemAlreadyExists = value.filter((item) => option.id === item.id);

    if (itemAlreadyExists.length <= 0) {
      changeValue((previous: any) => [...previous, { id: option.id }]);
      return;
    }

    changeValue(value.filter((item) => option.id !== item.id));
  }

  const handleIsActive = (item: any) => {
    const itemAlreadyExists = value.filter((value) => value.id === item.id);

    if (itemAlreadyExists.length > 0) {
      return true;
    }
    return false;
  };

  const handleInput = (e: any) => {
    setInputText(e);
  };

  const filteredData = dataItems?.filter((option: any) => {
    return option.name.toLowerCase().includes(inputText.toLowerCase());
  });

  return (
    <Container>
      <ContentHeader>
        <SelectButton onPress={changeModal} disabled={loading && true}>
          <TextSelect>Selecionar</TextSelect>
        </SelectButton>
      </ContentHeader>

      <Input
        placeholder="Buscar"
        autoCorrect={false}
        placeholderTextColor={theme.colors.primary}
        onChangeText={(e: any) => handleInput(e)}
      />

      {loading && <Spinner color={theme.colors.primary} />}

      {filteredData ? (
        <ListOptions
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: any) => (
            <Option
              key={item.id}
              onPress={() => handleSelectOption(item)}
              isActive={handleIsActive(item)}
            >
              <TextOption>
                {item.name[0].toUpperCase() +
                  item.name.substring(1).toLowerCase()}
              </TextOption>
            </Option>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      ) : (
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Falha ao carregar as opções
        </Text>
      )}
    </Container>
  );
}
