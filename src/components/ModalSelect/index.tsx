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
  TextSelect,
} from "./styles";

export function ModalSelect({
  changeModal,
  changeValue,
  value,
  dataItems,
  loading,
}: any) {
  const [inputText, setInputText] = useState("");
  const theme = useTheme();

  function handleSelectOption(option: any) {
    changeValue(option);
  }

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
          keyExtractor={(item) => item.code}
          renderItem={({ item }: any) => (
            <Option
              key={item.code}
              onPress={() => handleSelectOption(item)}
              isActive={value.code === item.code}
            >
              <Text>
                {item.name[0].toUpperCase() +
                  item.name.substring(1).toLowerCase()}
              </Text>
            </Option>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      ) : (
        <Text>Falha ao carregar as opções</Text>
      )}
    </Container>
  );
}
