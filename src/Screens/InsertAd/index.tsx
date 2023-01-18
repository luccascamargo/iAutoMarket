import React, { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";

import * as ImagePicker from "expo-image-picker";

import { createNumberMask, Masks } from "react-native-mask-input";

const dataKey = "@serramotors:advert-photos";

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
  ContentButtonGroup,
  ContainerForms,
  ButtonSelectImages,
  TextSelectImages,
  TextInformation,
  Separator,
  ContainerModal,
  ContentModal,
  TitleModal,
  ButtonModal,
  TextRemove,
  ButtonCancel,
  TextModal,
} from "./styles";

import { ButtonSelect } from "../../components/ButtonSelect";
import { Button } from "../../components/Button";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  Text,
  View,
} from "react-native";

import { typeCars } from "../../lib/fakeApi";
import { ModalSelect } from "../../components/ModalSelect";
import { colors, cambio, doors } from "../../lib/fakeApi";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
// import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageCard } from "../../components/ImageCard";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";

const numberMask = createNumberMask({
  separator: ".",
  precision: 3,
});

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const urlAPI =
  Platform.OS === "ios"
    ? "http://localhost:3333/create-advert"
    : "http://192.168.1.3:3333/create-advert";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

export function InsertAd() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [valueIndex, setValueIndex] = useState();
  const [arrayImages, setArrayImages] = useState<any>([]);
  const [listYearModel, setListYearModel] = useState([]);
  const [models, setModels] = useState([]);
  const [boards, setBoards] = useState([]);
  const [cep, setCep] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [plate, setPlate] = useState<any>();
  const [km, setKm] = useState<any>();
  const [typeCar, setTypeCar] = useState({
    code: "default",
    name: "Selecione",
  });

  const [board, setBoard] = useState({
    code: "default",
    name: "Selecione",
  });

  const [modelCar, setModelCar] = useState({
    code: "default",
    name: "Selecione",
  });

  const [yearModel, setYearModel] = useState({
    code: "default",
    name: "Selecione",
  });

  const [valueDoors, setValueDoors] = useState({
    code: "default",
    name: "Selecione",
  });

  const [transmissionType, setTransmissionType] = useState({
    code: "default",
    name: "Selecione",
  });

  const [color, setColor] = useState({
    code: "default",
    name: "Selecione",
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

  const [typeCarError, setTypeCarError] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [modelYearError, setModelYearError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [doorsError, setDoorsError] = useState(false);
  const [transmissionError, setTransmissionError] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const { user } = useAuth();
  const theme = useTheme();

  const handleCreate = async () => {
    setLoadingCreate(true);
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
      formData.append("image-create", {
        type: "image/jpeg",
        // @ts-ignore
        name: image.fileName,
        // @ts-ignore
        uri: image.uri,
      })
    );

    formData.append("user_id", user.id);
    formData.append("cep", cep.toString());
    formData.append("type", typeCar.name);
    formData.append("type_value", typeCar.code);
    formData.append("board", board.name);
    formData.append("board_value", board.code);
    formData.append("model", modelCar.name);
    formData.append("model_value", modelCar.code);
    formData.append("year_model", yearModel.name);
    formData.append("year_model_value", yearModel.code);
    formData.append("color", color.name);
    formData.append("price", (price / 100).toString());
    formData.append("plate", plate.toString());
    formData.append("mileage", km.toString());
    formData.append("doors", valueDoors.code);
    formData.append("transmission", transmissionType.code);
    formData.append("description", description);

    try {
      const { data } = await axios.post(urlAPI, formData);
      if (data.code === "ATPLAN") {
        Alert.alert(data.message);
        navigation.navigate("signatures");
        setLoadingCreate(false);
      }
      handleReset();
      setLoadingCreate(false);
      navigation.navigate("myAds");
    } catch (err) {
      setLoadingCreate(false);
      console.log(err);
    }
  };

  const handleReset = () => {
    setTypeCar({
      code: "default",
      name: "Selecione",
    });
    setBoard({
      code: "default",
      name: "Selecione",
    });
    setModelCar({
      code: "default",
      name: "Selecione",
    });
    setYearModel({
      code: "default",
      name: "Selecione",
    });
    setColor({
      code: "default",
      name: "Selecione",
    });
    setValueDoors({
      code: "default",
      name: "Selecione",
    });
    setTransmissionType({
      code: "default",
      name: "Selecione",
    });
    setPrice("");
    setPlate("");
    setKm("");
    setDescription("");
    setCep("");
    setArrayImages([]);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleBrands = async () => {
      if (typeCar.code === "default") {
        return;
      }
      try {
        setLoading(true);
        const config = {
          method: "get",
          url: `https://parallelum.com.br/fipe/api/v2/${typeCar.name.toLowerCase()}/brands`,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const result = await axios(config);

        setBoards(result.data);

        setBoard({
          code: "default",
          name: "Selecione",
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        console.log("Erro api ano marcas");
      }
    };
    handleBrands();
  }, [typeCar.code]);

  useEffect(() => {
    const handleBoards = async () => {
      if (board.code === "default") {
        return;
      }
      try {
        setLoading(true);
        const config = {
          method: "get",
          url: `https://parallelum.com.br/fipe/api/v2/${typeCar.name.toLowerCase()}/brands/${
            board.code
          }/models`,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const result = await axios(config);
        setModels(result.data);
        setModelCar({
          code: "default",
          name: "Selecione",
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        console.log("Erro api models");
      }
    };
    handleBoards();
  }, [board.code]);

  useEffect(() => {
    const handleModels = async () => {
      if (modelCar.code === "default") {
        return;
      }
      try {
        setLoading(true);
        const config = {
          method: "get",
          url: `https://parallelum.com.br/fipe/api/v2/${typeCar.name.toLowerCase()}/brands/${
            board.code
          }/models/${modelCar.code}/years`,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const result = await axios(config);
        setListYearModel(result.data);

        setYearModel({
          code: "default",
          name: "Selecione",
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        console.log("Erro api ano modelo");
      }
    };
    handleModels();
  }, [modelCar.code]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const handleRemovePhoto = (value: any) => {
    const result = arrayImages.filter((_: any, index: any) => index !== value);
    setArrayImages(result);
    onRefresh();
    setIsVisible(false);
  };

  const handleChangePosition = (from: any, to: any) => {
    arrayImages.splice(to, 0, arrayImages.splice(from, 1)[0]);
    onRefresh();
    setIsVisible(false);
  };

  const openImagePickerAsync = async () => {
    if (user.stripePlan === "SILVER") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: 5 - arrayImages.length,
      });

      if (pickerResult.canceled) {
        return;
      }

      pickerResult.assets.map((image) => {
        setArrayImages((prevState: any) => [...prevState, image]);
      });
    }
    if (user.stripePlan === "GOLD") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: 10 - arrayImages.length,
      });

      if (pickerResult.canceled) {
        return;
      }

      pickerResult.assets.map((image) => {
        setArrayImages((prevState: any) => [...prevState, image]);
      });
    }
    if (user.stripePlan === "PLATINUM") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: 15 - arrayImages.length,
      });

      if (pickerResult.canceled) {
        return;
      }

      pickerResult.assets.map((image) => {
        setArrayImages((prevState: any) => [...prevState, image]);
      });
    }
  };

  return (
    <Container>
      <ContentHeader>
        <Title>Inserir anuncio</Title>
        <ContentReset onPress={handleReset}>
          <TitleReset>Limpar</TitleReset>
        </ContentReset>
      </ContentHeader>

      <ContainerForms style={shadowContent}>
        <ContentForm>
          <FlatList
            data={arrayImages}
            keyExtractor={(item: any) => item.assetId}
            horizontal
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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

          {arrayImages.length < 5 && (
            <ButtonSelectImages
              onPress={openImagePickerAsync}
              style={shadowContent}
            >
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
              onPress={handleOpenTypeCar}
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
                  onPress={handleOpenBoard}
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
                    onPress={handleOpenModel}
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
                    onPress={handleOpenYearModel}
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
              value={price}
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
              value={plate}
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

          {user.stripePlan !== "SILVER" && (
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
          )}

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
            title="Cadastrar anúncio"
            onPress={handleCreate}
            disabled={loadingCreate && true}
          />

          <Modal visible={openTypeCar} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                loading={loading}
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
                loading={loading}
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
                loading={loading}
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
                loading={loading}
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
                loading={loading}
                changeValue={setValueDoors}
                changeModal={handleOpenModalDoors}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openTransmissionType} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                dataItems={cambio}
                loading={loading}
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
                loading={loading}
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
