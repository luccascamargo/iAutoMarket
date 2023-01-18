import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Platform, RefreshControl, Text, View } from "react-native";

import axios from "axios";

import * as ImagePicker from "expo-image-picker";

import { createNumberMask, Masks } from "react-native-mask-input";

import {
  Container,
  ContentHeader,
  Title,
  ContentForm,
  TitleReset,
  ContentReset,
  ContentButtonSelect,
  TitleSelect,
  InputPrice,
  ContainerForms,
  Separator,
  ButtonSelectImages,
  TextSelectImages,
  ContainerModal,
  ContentModal,
  TitleModal,
  ButtonModal,
  TextRemove,
  ButtonCancel,
  TextModal,
  TextInformation,
} from "./styles";

import { ButtonSelect } from "../../components/ButtonSelect";
import { Button } from "../../components/Button";
import { Alert, Modal } from "react-native";

import { typeCars } from "../../lib/fakeApi";
import { ModalSelect } from "../../components/ModalSelect";
import { colors, cambio, doors } from "../../lib/fakeApi";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageCard } from "../../components/ImageCard";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "../../components/Input";

const numberMask = createNumberMask({
  separator: ".",
  precision: 3,
});

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const urlAPI =
  Platform.OS === "ios"
    ? "http://localhost:3333/update-advert"
    : "http://192.168.1.3:3333/update-advert";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function ModalEdit({ route, navigation }: any) {
  const advert = route.params.dataItem;
  const priceFormatted = parseInt(advert?.price) * 100;
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [valueIndex, setValueIndex] = useState();
  const [arrayImages, setArrayImages] = useState(advert?.photos);
  const [listYearModel, setListYearModel] = useState([]);
  const [models, setModels] = useState([]);
  const [boards, setBoards] = useState([]);
  const [description, setDescription] = useState(advert?.description);
  const [cep, setCep] = useState<any>(advert?.cep);
  const [price, setPrice] = useState<any>(priceFormatted);
  const [plate, setPlate] = useState<any>(advert?.plate);
  const [km, setKm] = useState<any>(advert?.mileage.toString());
  const [typeCarError, setTypeCarError] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [modelYearError, setModelYearError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [doorsError, setDoorsError] = useState(false);
  const [transmissionError, setTransmissionError] = useState(false);
  const { user } = useAuth();
  const [typeCar, setTypeCar] = useState({
    code: advert?.type_value,
    name: advert?.type,
  });

  const [board, setBoard] = useState({
    code: advert?.board_value,
    name: advert?.board,
  });

  const [modelCar, setModelCar] = useState({
    code: advert?.model_value,
    name: advert?.model,
  });

  const [yearModel, setYearModel] = useState({
    code: advert?.year_model_value,
    name: advert?.year_model,
  });

  const [valueDoors, setValueDoors] = useState({
    code: advert?.doors,
    name: advert?.doors,
  });

  const [transmissionType, setTransmissionType] = useState({
    code: advert?.transmission,
    name: advert?.transmission,
  });

  const [color, setColor] = useState({
    code: advert?.color,
    name: advert?.color,
  });

  const [openTypeCar, setOpenTypeCar] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openYearModel, setOpenYearModel] = useState(false);
  const [openModalDoors, setOpenModalDoors] = useState(false);
  const [openTransmissionType, setOpenTransmissionType] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const handleOpenTypeCar = () => setOpenTypeCar(!openTypeCar);
  const handleOpenBoard = () => setOpenBoard(!openBoard);
  const handleOpenModel = () => setOpenModel(!openModel);
  const handleOpenYearModel = () => setOpenYearModel(!openYearModel);
  const handleOpenModalDoors = () => setOpenModalDoors(!openModalDoors);
  const handleOpenTransmissionType = () =>
    setOpenTransmissionType(!openTransmissionType);
  const handleOpenColor = () => setOpenColor(!openColor);

  const theme = useTheme();
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleUpdate = () => {
    setLoadingUpdate(true);
    if (typeCar.code === "default") {
      setTypeCarError(true);
      return;
    }
    if (board.code === "default") {
      setBoardError(true);
      return;
    }
    if (modelCar.code === "default") {
      setModelError(true);
      return;
    }
    if (yearModel.code === "default") {
      setModelYearError(true);
      return;
    }
    if (color.code === "default") {
      setColorError(true);
      return;
    }

    if (
      typeCar.code === "default" ||
      board.code === "default" ||
      modelCar.code === "default" ||
      yearModel.code === "default" ||
      color.code === "default" ||
      price === 0 ||
      plate === "" ||
      km === "" ||
      cep === "" ||
      valueDoors.code === "default" ||
      transmissionType.code === "default"
    ) {
      Alert.alert("Preencha os campos corretamente");
      return;
    }

    const formData = new FormData();

    arrayImages.forEach((image: any) =>
      formData.append("image-update", {
        type: "image/jpeg",
        //@ts-ignore
        name: image.filename || image.field_name,
        //@ts-ignore
        uri: image.path || image.uri,
      })
    );

    formData.append("id", advert.id);
    formData.append("cep", cep.toString());
    formData.append("color", color.name);
    formData.append("price", (price / 100).toString());
    formData.append("plate", plate.toString());
    formData.append("mileage", km.toString());
    formData.append("doors", valueDoors.code);
    formData.append("transmission", transmissionType.code);
    formData.append("description", description);

    axios
      .put(urlAPI, formData)
      .then(() => {
        Alert.alert("Anúncio alterado com sucesso");
        navigation.goBack();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingUpdate(false));
  };

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 5 - arrayImages.length,
    });

    if (pickerResult.canceled) {
      return;
    }
    //@ts-ignore
    pickerResult.assets.map((image: any) => {
      setArrayImages((prevState: any) => [...prevState, image]);
    });
  };

  const handleRemovePhoto = (i: any) => {
    const result = arrayImages.filter((_: any, index: any) => index !== i);
    setArrayImages(result);
    onRefresh();
    setIsVisible(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const handleChangePosition = (from: any, to: any) => {
    arrayImages.splice(to, 0, arrayImages.splice(from, 1)[0]);
    onRefresh();
    setIsVisible(false);
  };

  return (
    <Container>
      <ContentHeader>
        <Title>Editar anúncio</Title>
        <ContentReset onPress={() => navigation.goBack()}>
          <TitleReset>cancelar</TitleReset>
        </ContentReset>
      </ContentHeader>

      <ContainerForms>
        <ContentForm>
          <FlatList
            data={arrayImages}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            horizontal
            ItemSeparatorComponent={() => <Separator />}
            renderItem={({ item, index }: any) => (
              <ImageCard
                onPress={() => {
                  setValueIndex(index);
                  setIsVisible(true);
                }}
                item={item}
                index={index}
              />
            )}
            style={{ padding: 16 }}
          />
          <Modal visible={isVisible} transparent animationType="fade">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <View style={{ flex: 1 }}>
                <ContainerModal>
                  <ContentModal style={shadowContent}>
                    <TitleModal>O que deseja fazer?</TitleModal>
                    <ButtonModal
                      onPress={() => handleChangePosition(valueIndex, 0)}
                    >
                      <Text>Adicionar como foto principal</Text>
                    </ButtonModal>
                    <ButtonModal onPress={() => handleRemovePhoto(valueIndex)}>
                      <TextRemove>Remover imagem</TextRemove>
                    </ButtonModal>
                    <ButtonCancel onPress={() => setIsVisible(false)}>
                      <TextModal>Cancelar</TextModal>
                    </ButtonCancel>
                  </ContentModal>
                </ContainerModal>
              </View>
            </GestureHandlerRootView>
          </Modal>
          {arrayImages?.length < 5 && (
            <ButtonSelectImages onPress={openImagePickerAsync}>
              <TextSelectImages>Adicione suas fotos</TextSelectImages>
            </ButtonSelectImages>
          )}

          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione o tipo de veiculo</TitleSelect>
            </View>
            <ButtonSelect
              title={typeCar.name}
              error={typeCarError}
              disable={true}
            />
          </ContentButtonSelect>
          {typeCar.code != "default" && (
            <>
              <ContentButtonSelect elevation={10}>
                <View style={{ width: "100%", paddingLeft: 20 }}>
                  <TitleSelect>Selecione a marca</TitleSelect>
                </View>
                <ButtonSelect
                  error={boardError}
                  title={
                    board.name[0].toUpperCase() +
                    board.name.substring(1).toLocaleLowerCase()
                  }
                  disable={true}
                />
              </ContentButtonSelect>
              {board.code != "default" && (
                <ContentButtonSelect elevation={10}>
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <TitleSelect>Selecione o modelo</TitleSelect>
                  </View>
                  <ButtonSelect
                    error={modelError}
                    title={
                      modelCar.name[0].toUpperCase() +
                      modelCar.name.substring(1).toLocaleLowerCase()
                    }
                    disable={true}
                  />
                </ContentButtonSelect>
              )}
              {modelCar.code != "default" && (
                <ContentButtonSelect elevation={10}>
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <TitleSelect>Selecione o ano modelo</TitleSelect>
                  </View>
                  <ButtonSelect
                    error={modelYearError}
                    title={yearModel.name}
                    disable={true}
                  />
                </ContentButtonSelect>
              )}
            </>
          )}
          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione a cor</TitleSelect>
            </View>
            <ButtonSelect
              error={colorError}
              title={color.name}
              onPress={handleOpenColor}
            />
          </ContentButtonSelect>
          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Valor</TitleSelect>
            </View>
            <InputPrice
              style={shadowContent}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.text}
              value={`${price}`}
              onChangeText={(unmasked, masked) => {
                setPrice(masked);
              }}
              mask={Masks.BRL_CURRENCY}
            />
          </ContentButtonSelect>

          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Placa</TitleSelect>
            </View>
            <InputPrice
              style={shadowContent}
              placeholderTextColor={theme.colors.text}
              value={`${plate}`}
              onChangeText={(unmasked, masked) => {
                setPlate(masked);
              }}
              mask={Masks.BRL_CAR_PLATE}
            />
            <TextInformation>
              Não se preocupe, sua placa não aparecerá no seu anúncio*
            </TextInformation>
          </ContentButtonSelect>

          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>KM</TitleSelect>
            </View>
            <InputPrice
              style={shadowContent}
              placeholderTextColor={theme.colors.text}
              keyboardType="numeric"
              value={km}
              onChangeText={(unmasked, masked) => {
                setKm(masked);
              }}
              mask={numberMask}
            />
          </ContentButtonSelect>

          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Descrição</TitleSelect>
            </View>
            <Input
              value={description}
              multiline
              scrollEnabled={false}
              onChangeText={(e) => {
                setDescription(e);
              }}
            />
          </ContentButtonSelect>

          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>CEP</TitleSelect>
            </View>
            <InputPrice
              style={shadowContent}
              placeholderTextColor={theme.colors.text}
              keyboardType="numeric"
              value={cep}
              onChangeText={(unmasked, masked) => {
                setCep(masked);
              }}
              mask={Masks.ZIP_CODE}
            />
          </ContentButtonSelect>

          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione a quantidade de portas</TitleSelect>
            </View>
            <ButtonSelect
              error={doorsError}
              title={valueDoors.name}
              onPress={handleOpenModalDoors}
            />
          </ContentButtonSelect>
          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione o tipo de cambio</TitleSelect>
            </View>
            <ButtonSelect
              error={transmissionError}
              title={transmissionType.name}
              onPress={handleOpenTransmissionType}
            />
          </ContentButtonSelect>

          <Button
            title="Confirmar"
            onPress={handleUpdate}
            disabled={loadingUpdate && true}
          />

          <Modal visible={openTypeCar} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={typeCars}
                value={typeCar}
                changeValue={setTypeCar}
                changeModal={handleOpenTypeCar}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openBoard} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={boards}
                value={board}
                changeValue={setBoard}
                changeModal={handleOpenBoard}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openModel} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={models}
                value={modelCar}
                changeValue={setModelCar}
                changeModal={handleOpenModel}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openYearModel} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={listYearModel}
                value={yearModel}
                changeValue={setYearModel}
                changeModal={handleOpenYearModel}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openModalDoors} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={doors}
                value={valueDoors}
                changeValue={setValueDoors}
                changeModal={handleOpenModalDoors}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openTransmissionType} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={cambio}
                value={transmissionType}
                changeValue={setTransmissionType}
                changeModal={handleOpenTransmissionType}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openColor} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={colors}
                value={color}
                changeValue={setColor}
                changeModal={handleOpenColor}
              />
            </GestureHandlerRootView>
          </Modal>
        </ContentForm>
      </ContainerForms>
    </Container>
  );
}
