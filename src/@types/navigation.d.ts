import { iAdvertProps } from "./advert.d";
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      favorites: undefined;
      advert: {
        dataItem: iAdvertProps;
      };
      editAdvert: {
        dataItem: iAdvertProps;
      };
      details: undefined;
      forgotPassword: {
        email: string;
      };
      createPhone: undefined;
      profile: undefined;
      myAds: undefined;
      login: undefined;
      home: undefined;
      signatures: undefined;
      signature: {
        signature: undefined;
      };
      filtered: {
        adverts: iAdvertProps;
      };
      createAccount: undefined;
      search: undefined;
      insertAd: undefined;
      profile: undefined;
      more: undefined;
      confirmAccount: {
        email: string;
      };
    }
  }
}
