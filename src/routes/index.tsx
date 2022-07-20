import { NavigationContainer } from "@react-navigation/native";
import { Loading } from "../components/Loading";
import { useAuthContext } from "../contexts/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes: React.FC = () => {
  const { isUserLoading, isAuthenticated } = useAuthContext();

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
