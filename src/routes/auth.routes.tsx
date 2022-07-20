import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      animation: "fade_from_bottom",
    }}
  >
    <Screen name="signIn" component={SignIn} />
    <Screen name="signUp" component={SignUp} />
  </Navigator>
);
