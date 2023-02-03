import React, { useEffect, useState } from "react";

import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import {
  Container,
  ContentHeader,
  Title,
  ContentForm,
  TitleReset,
  ContentReset,
  ContentButtonSelect,
  TitleSelect,
  ContainerForms,
  TextModalKm,
  ContentGroupSelect,
} from "./styles";

import { ButtonSelect } from "../../components/ButtonSelect";
import { Button } from "../../components/Button";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  Platform,
  View,
} from "react-native";

import { typeCars } from "../../lib/fakeApi";
import { ModalSelect } from "../../components/ModalSelect";
import { colors, cambio, doors } from "../../lib/fakeApi";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { createURL } from "expo-linking";
import { ModalOptionals } from "../../components/ModalOptionals";
import { api } from "../../services/api";

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

const width = Dimensions.get("screen").width;

export function FilterSelect() {
  const [listYearModel, setListYearModel] = useState([]);
  const [minMileage, setMinMileage] = useState("Selecione");
  const [maxMileage, setMaxMileage] = useState("Selecione");
  const [minPrice, setMinPrice] = useState("Selecione");
  const [maxPrice, setMaxPrice] = useState("Selecione");
  const [minYear, setMinYear] = useState("Selecione");
  const [maxYear, setMaxYear] = useState("Selecione");
  const [models, setModels] = useState([]);
  const [boards, setBoards] = useState([]);
  const [cities, setCities] = useState<any>([]);
  const [city, setCity] = useState({
    code: "default",
    name: "Selecione",
  });
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

  const [opt, setOpt] = useState([]);
  const [openTypeCar, setOpenTypeCar] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [optionals, setOptionals] = useState([]);
  const [openOptionals, setOpenOptionals] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openModalDoors, setOpenModalDoors] = useState(false);
  const [openTransmissionType, setOpenTransmissionType] = useState(false);
  const [openYearModel, setOpenYearModel] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenTypeCar = () => setOpenTypeCar(!openTypeCar);
  const handleOpenCity = () => setOpenCity(!openCity);
  const handleOpenBoard = () => setOpenBoard(!openBoard);
  const handleOpenModel = () => setOpenModel(!openModel);
  const handleOpenModalDoors = () => setOpenModalDoors(!openModalDoors);
  const handleOpenYearModel = () => setOpenYearModel(!openYearModel);
  const handleOpenTransmissionType = () =>
    setOpenTransmissionType(!openTransmissionType);
  const handleOpenColor = () => setOpenColor(!openColor);
  const handleOpenOptionals = () => setOpenOptionals(!openOptionals);

  const navigation = useNavigation();
  const theme = useTheme();

  const handleCreate = async () => {
    setIsLoading(true);
    const data = {
      city: city.name === "Selecione" ? "" : city.name,
      type: typeCar.name === "Selecione" ? "" : typeCar.name,
      board: board.name === "Selecione" ? "" : board.name,
      model: modelCar.name === "Selecione" ? "" : modelCar.name,
      color: color.name === "Selecione" ? "" : color.name,
      transmission:
        transmissionType.name === "Selecione" ? "" : transmissionType.name,
      doors: valueDoors.name === "Selecione" ? "" : valueDoors.name,
      minMileage: minMileage === "Selecione" ? 0 : minMileage,
      maxMileage: maxMileage === "Selecione" ? 2000000 : maxMileage,
      minPrice: minPrice === "Selecione" ? 0 : minPrice,
      maxPrice: maxPrice === "Selecione" ? 2000000 : maxPrice,
      minYear: minYear === "Selecione" ? 1950 : minYear,
      maxYear: maxYear === "Selecione" ? 2023 : maxYear,
      optionals: JSON.stringify(opt),
    };

    await api
      .post("filtered", data)
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        navigation.navigate("filtered", {
          adverts: response.data.advertsFiltered,
        });
      })
      .catch((err) => {
        console.log(err);

        setTimeout(() => {
          Alert.alert(
            "Não foi possível buscar as informações, tente novamente mais tarde"
          );
          setIsLoading(false);
        }, 2000);
      });
  };

  const handleReset = () => {
    setCity({
      code: "default",
      name: "Selecione",
    });
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
    setMinMileage("Selecione");
    setMaxMileage("Selecione");
    setMinPrice("Selecione");
    setMaxPrice("Selecione");
    setMinYear("Selecione");
    setMaxYear("Selecione");
    setOpt([]);
  };

  useEffect(() => {
    const FormatCity = async () => {
      try {
        setLoading(true);
        let result: any = [];
        const citiesFormatted: any = [];
        await axios
          .get(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios"
          )
          .then((response) => {
            result = response.data;
          })
          .catch((err) => console.log(err));

        result?.map((city: any) => {
          citiesFormatted.push({
            code: city.id,
            name: city.nome,
          });
        });

        setCities(citiesFormatted);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    FormatCity();
  }, []);

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

  useEffect(() => {
    const getOptionals = async () => {
      try {
        const { data } = await api.get("optionals", {
          headers: {
            "Content-type": "Application/json",
            Accept: "Application/json",
          },
        });
        setOptionals(data);
      } catch (err) {
        console.log(err);
      }
    };

    getOptionals();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [openModalKm, setOpenModalKm] = useState(false);
  const [openModalPrice, setOpenModalPrice] = useState(false);
  const [openModalYear, setOpenModalYear] = useState(false);

  const handleOpenModalKm = () => setOpenModalKm(!openModalKm);
  const handleOpenModalPrice = () => setOpenModalPrice(!openModalPrice);
  const handleOpenModalYear = () => setOpenModalYear(!openModalYear);

  const [years, setYears] = useState([]);

  function countYears() {
    const arr = [];
    for (let i = 1950; i <= 2023; i++) {
      arr.push(i);
    }
    setYears(arr);
  }
  useEffect(() => {
    countYears();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Container>
      <ContentHeader elevation={10}>
        <Title>Filtros</Title>
        <ContentReset onPress={handleReset}>
          <TitleReset>Limpar</TitleReset>
        </ContentReset>
      </ContentHeader>

      <ContainerForms style={shadowContent}>
        <ContentForm>
          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione a cidade</TitleSelect>
            </View>
            <ButtonSelect
              title={city.name}
              onPress={handleOpenCity}
              elevation={10}
            />
          </ContentButtonSelect>
          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione o tipo de veiculo</TitleSelect>
            </View>
            <ButtonSelect title={typeCar.name} onPress={handleOpenTypeCar} />
          </ContentButtonSelect>
          {typeCar.code != "default" && (
            <>
              <ContentButtonSelect elevation={10}>
                <View style={{ width: "100%", paddingLeft: 20 }}>
                  <TitleSelect>Selecione a marca</TitleSelect>
                </View>
                <ButtonSelect
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
                    title={yearModel.name}
                    onPress={handleOpenYearModel}
                  />
                </ContentButtonSelect>
              )}
            </>
          )}
          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione a cor</TitleSelect>
            </View>
            <ButtonSelect title={color.name} onPress={handleOpenColor} />
          </ContentButtonSelect>

          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Ano</TitleSelect>
            </View>
            <ContentGroupSelect>
              <ButtonSelect
                title={minYear}
                group
                onPress={handleOpenModalYear}
              />
              <ButtonSelect
                title={maxYear}
                group
                onPress={handleOpenModalYear}
              />
            </ContentGroupSelect>
          </ContentButtonSelect>

          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Valor</TitleSelect>
            </View>
            <ContentGroupSelect>
              <ButtonSelect
                title={minPrice}
                group
                onPress={handleOpenModalPrice}
              />
              <ButtonSelect
                title={maxPrice}
                group
                onPress={handleOpenModalPrice}
              />
            </ContentGroupSelect>
          </ContentButtonSelect>

          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>KM</TitleSelect>
            </View>
            <ContentGroupSelect>
              <ButtonSelect
                title={minMileage}
                group
                onPress={handleOpenModalKm}
              />
              <ButtonSelect
                title={maxMileage}
                group
                onPress={handleOpenModalKm}
              />
            </ContentGroupSelect>
          </ContentButtonSelect>

          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione a quantidade de portas</TitleSelect>
            </View>
            <ButtonSelect
              title={valueDoors.name}
              onPress={handleOpenModalDoors}
            />
          </ContentButtonSelect>

          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione o tipo de cambio</TitleSelect>
            </View>
            <ButtonSelect
              title={transmissionType.name}
              onPress={handleOpenTransmissionType}
            />
          </ContentButtonSelect>

          <ContentButtonSelect elevation={10}>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Selecione os opcionais</TitleSelect>
            </View>
            <ButtonSelect
              title={
                opt.length === 0
                  ? "Selecione"
                  : `${opt.length} opcional(s) selecionados`
              }
              items={opt}
              onPress={handleOpenOptionals}
            />
          </ContentButtonSelect>

          <Button title="Filtrar" onPress={handleCreate} />

          <Modal visible={openModalKm} transparent animationType="slide">
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  width: width,
                  backgroundColor: "#FFFFFF",
                  height: 300,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    padding: 10,
                  }}
                >
                  <RectButton
                    style={{ padding: 5, borderRadius: 5 }}
                    onPress={handleOpenModalKm}
                  >
                    <TextModalKm>Selecionar</TextModalKm>
                  </RectButton>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Picker
                    style={{
                      width: "50%",
                    }}
                    selectedValue={minMileage}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setMinMileage(itemValue)
                    }
                  >
                    {Array.from({ length: 400 })
                      .map((_, i) => i * 5000)
                      .map((km) => (
                        <Picker.Item label={`${km}`} value={km} key={km} />
                      ))}
                  </Picker>
                  <Picker
                    style={{
                      width: "50%",
                    }}
                    selectedValue={maxMileage}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setMaxMileage(itemValue)
                    }
                  >
                    {Array.from({ length: 400 })
                      .map((_, i) => i * 5000)
                      .map((km) => (
                        <Picker.Item label={`${km}`} value={km} key={km} />
                      ))}
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>

          <Modal visible={openModalPrice} transparent animationType="slide">
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  width: width,
                  backgroundColor: "#FFFFFF",
                  height: 300,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    padding: 10,
                  }}
                >
                  <RectButton
                    style={{ padding: 5, borderRadius: 5 }}
                    onPress={handleOpenModalPrice}
                  >
                    <TextModalKm>Selecionar</TextModalKm>
                  </RectButton>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Picker
                    style={{
                      width: "50%",
                    }}
                    selectedValue={minPrice}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setMinPrice(itemValue)
                    }
                  >
                    {Array.from({ length: 400 })
                      .map((_, i) => i * 5000)
                      .map((price) => (
                        <Picker.Item
                          label={`${price}`}
                          value={price}
                          key={price}
                        />
                      ))}
                  </Picker>
                  <Picker
                    style={{
                      width: "50%",
                    }}
                    selectedValue={maxPrice}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setMaxPrice(itemValue)
                    }
                  >
                    {Array.from({ length: 400 })
                      .map((_, i) => i * 5000)
                      .map((price) => (
                        <Picker.Item
                          label={`${price}`}
                          value={price}
                          key={price}
                        />
                      ))}
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>

          <Modal visible={openModalYear} transparent animationType="slide">
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  width: width,
                  backgroundColor: "#FFFFFF",
                  height: 300,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    padding: 10,
                  }}
                >
                  <RectButton
                    style={{ padding: 5, borderRadius: 5 }}
                    onPress={handleOpenModalYear}
                  >
                    <TextModalKm>Selecionar</TextModalKm>
                  </RectButton>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Picker
                    style={{
                      width: "50%",
                    }}
                    selectedValue={minYear}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setMinYear(itemValue)
                    }
                  >
                    {years.map((year) => (
                      <Picker.Item label={`${year}`} value={year} key={year} />
                    ))}
                  </Picker>
                  <Picker
                    style={{
                      width: "50%",
                    }}
                    selectedValue={maxYear}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setMaxYear(itemValue)
                    }
                  >
                    {years.map((year) => (
                      <Picker.Item label={`${year}`} value={year} key={year} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>

          <Modal visible={openCity} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalSelect
                loading={loading}
                dataItems={cities}
                value={city}
                changeValue={setCity}
                changeModal={handleOpenCity}
              />
            </GestureHandlerRootView>
          </Modal>

          <Modal visible={openOptionals} animationType="slide">
            <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
              <ModalOptionals
                loading={loading}
                dataItems={optionals}
                value={opt}
                changeValue={setOpt}
                changeModal={handleOpenOptionals}
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
                loading={loading}
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
                loading={loading}
                dataItems={models}
                value={modelCar}
                changeValue={setModelCar}
                changeModal={handleOpenModel}
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
