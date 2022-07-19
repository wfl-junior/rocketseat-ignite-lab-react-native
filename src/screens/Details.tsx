import { useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import { Header } from "../components/Header";

export interface DetailsRouteParams {
  orderId: string;
}

export const Details: React.FC = () => {
  const { params } = useRoute();
  const { orderId } = params as DetailsRouteParams;

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
      <Text color="white">{orderId}</Text>
    </VStack>
  );
};
