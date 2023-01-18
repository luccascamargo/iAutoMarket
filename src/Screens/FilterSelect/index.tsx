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

const shadowContent = {
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 0 },
};

const urlAPI =
  Platform.OS === "ios"
    ? "http://localhost:3333/filtered"
    : "http://192.168.1.3:3333/filtered";

const width = Dimensions.get("screen").width;

export function FilterSelect() {
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
  const [openModalDoors, setOpenModalDoors] = useState(false);
  const [openTransmissionType, setOpenTransmissionType] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [order, setOrder] = useState("Data");

  const handleOpenTypeCar = () => setOpenTypeCar(!openTypeCar);
  const handleOpenCity = () => setOpenCity(!openCity);
  const handleOpenBoard = () => setOpenBoard(!openBoard);
  const handleOpenModel = () => setOpenModel(!openModel);
  const handleOpenModalDoors = () => setOpenModalDoors(!openModalDoors);
  const handleOpenTransmissionType = () =>
    setOpenTransmissionType(!openTransmissionType);
  const handleOpenColor = () => setOpenColor(!openColor);

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
    };

    await axios
      .post(urlAPI, data)
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
  };

  useEffect(() => {
    const FormatCity = async () => {
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
    };
    FormatCity();
  }, []);

  useEffect(() => {
    if (typeCar.code !== "default") {
      const config = {
        method: "get",
        url: `https://parallelum.com.br/fipe/api/v2/${typeCar.name.toLowerCase()}/brands`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then((response) => {
          setBoards(response.data);
        })
        .catch((error) => console.log(error, "API Marcas"));

      setBoard({
        code: "default",
        name: "Selecione",
      });
    }
  }, [typeCar.code]);

  useEffect(() => {
    if (board.code !== "default") {
      const config = {
        method: "get",
        url: `https://parallelum.com.br/fipe/api/v2/${typeCar.name.toLowerCase()}/brands/${
          board.code
        }/models`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then((response) => {
          setModels(response.data);
        })
        .catch((err) => console.log(err, "API Modelos"));
      setModelCar({
        code: "default",
        name: "Selecione",
      });
    }
  }, [board.code]);

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
        <ActivityIndicator size="large" color="#000" />
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
              <ContentButtonSelect>
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
                <ContentButtonSelect>
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

          <ContentButtonSelect>
            <View style={{ width: "100%", paddingLeft: 20 }}>
              <TitleSelect>Ordene por</TitleSelect>
            </View>
            <View style={{ width: "90%", marginTop: 10 }}>
              <SegmentedControl
                values={["Data", "Preço", "km"]}
                selectedIndex={0}
                onValueChange={(event) => setOrder(event)}
                fontStyle={{ color: theme.colors.primary }}
                activeFontStyle={{ color: theme.colors.white }}
                tintColor={theme.colors.primary}
                backgroundColor={theme.colors.background}
              />
            </View>
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
                dataItems={cities}
                value={city}
                changeValue={setCity}
                changeModal={handleOpenCity}
              />
            </GestureHandlerRootView>
          </Modal>

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
