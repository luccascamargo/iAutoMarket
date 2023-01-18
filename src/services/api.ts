import axios from "axios";

// let storageUser: any = AsyncStorage.getItem("@serramotorsAuth");

// interface AxiosErrorResponse {
//   code?: string;
// }

export const api = axios.create({
  baseURL: "http://localhost:3333/",
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error: AxiosError<AxiosErrorResponse>) => {
//     if (error.response?.status === 401) {
//       if (error.response?.data?.code === "token.invalid") {
//         let result: any = {};
//         let originalConfig = error.config;
//         await AsyncStorage.getItem("@serramotorsAuth")
//           .then((response: any) => {
//             result = JSON.parse(response);
//             console.log(JSON.parse(response));
//           })
//           .catch((err) => console.log("aqui"));

//         console.log(result);

//         api
//           .post("refresh-token", {
//             refresh_token: result?.refreshToken.id,
//           })
//           .then((response) => {
//             console.log(response);
//             if (response.data.message === "Invalid refresh token") {
//               AsyncStorage.removeItem("@serramotorsAuth").then(() => {});
//               RNRestart.Restart();
//               Alert.alert("Faça o login novamente");
//             }

//             originalConfig.headers[
//               "Authorization"
//             ] = `Bearer ${response.data.token}`;
//           })
//           .catch((error) => {
//             console.log("aqui");
//           });
//       } else {
//         RNRestart.Restart();
//         Alert.alert("Algo de errado aconteceu");
//       }
//     }
//   }
// );
