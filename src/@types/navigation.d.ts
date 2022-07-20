import { DetailsRouteParams } from "../screens/Details";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      new: undefined;
      details: DetailsRouteParams;
      signIn: undefined;
      signUp: undefined;
    }
  }
}
