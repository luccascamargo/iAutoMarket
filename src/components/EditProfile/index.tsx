import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Masks } from "react-native-mask-input";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { AntDesign } from "@expo/vector-icons";

import { Button } from "../Button";
import {
  ContentHeader,
  Icon,
  Title,
  Container,
  ContentChangeUser,
  ContentButtonSelect,
  TitleSelect,
  InputEdit,
} from "./styles";
import { api } from "../../services/api";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function EditProfile({
  handleOpenModalEditProfile,
  email,
  phone,
  name,
  familyName,
}: any) {
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newName, setNewName] = useState(name);
  const [newFamilyName, setNewFamilyName] = useState(familyName);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleChangeUser = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          "Content-type": "Application/json",
          Accept: "Application/json",
        },
        data: {
          phone: newPhone,
          email,
        },
      };
      await api.put("user", options);
      Alert.alert("Alteração concluída");
      setLoading(false);
      // @ts-ignore
      setUser((prevState: any) => ({ ...prevState, phone: newPhone }));
      navigation.navigate("profile");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContentHeader style={shadowContent}>
        <Title>Editar perfil</Title>
        <Icon onPress={handleOpenModalEditProfile}>
          <AntDesign
            name="arrowleft"
            size={32}
            color={theme.colors.primary}
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          />
        </Icon>
      </ContentHeader>

      <ContentChangeUser>
        <ContentButtonSelect elevation={10}>
          <View style={{ width: "100%", paddingLeft: 20 }}>
            <TitleSelect>E-mail</TitleSelect>
          </View>
          <InputEdit
            style={shadowContent}
            placeholderTextColor={theme.colors.text}
            editable={false}
            value={newEmail}
            onChangeText={(e: any) => setNewEmail(e)}
          />
        </ContentButtonSelect>
        <ContentButtonSelect elevation={10}>
          <View style={{ width: "100%", paddingLeft: 20 }}>
            <TitleSelect>Nome</TitleSelect>
          </View>
          <InputEdit
            style={shadowContent}
            placeholderTextColor={theme.colors.text}
            editable={false}
            value={newName}
            onChangeText={(e: any) => setNewName(e)}
          />
        </ContentButtonSelect>
        <ContentButtonSelect elevation={10}>
          <View style={{ width: "100%", paddingLeft: 20 }}>
            <TitleSelect>Sobrenome</TitleSelect>
          </View>
          <InputEdit
            style={shadowContent}
            placeholderTextColor={theme.colors.text}
            editable={false}
            value={newFamilyName}
            onChangeText={(e: any) => setNewFamilyName(e)}
          />
        </ContentButtonSelect>
        <ContentButtonSelect elevation={10}>
          <View style={{ width: "100%", paddingLeft: 20 }}>
            <TitleSelect>Telefone</TitleSelect>
          </View>
          <InputEdit
            style={shadowContent}
            placeholderTextColor={theme.colors.text}
            value={newPhone}
            onChangeText={(unmasked, masked) => {
              setNewPhone(masked);
            }}
            mask={Masks.BRL_PHONE}
          />
        </ContentButtonSelect>
        <Button
          title="Alterar"
          onPress={handleChangeUser}
          disabled={loading && true}
        />
      </ContentChangeUser>
    </Container>
  );
}
