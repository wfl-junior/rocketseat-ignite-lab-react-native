import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { OrderDTO } from "../DTOs/OrderDTO";

export const Register: React.FC = () => {
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  async function handleNewOrder() {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsLoading(true);

    try {
      const newOrder: OrderDTO = {
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp() as any,
      };

      await firestore().collection("orders").add(newOrder);

      Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
      goBack();
    } catch (error) {
      console.warn(error);
      setIsLoading(false);

      Alert.alert("Solicitação", "Não foi possível registrar o pedido.");
    }
  }

  return (
    <VStack flex={1} pt={2} px={6} pb={6} bg="gray.600">
      <Header title="Solicitação" />

      <Input
        placeholder="Número do Patrimônio"
        mt={4}
        value={patrimony}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        onPress={handleNewOrder}
        isLoading={isLoading}
      />
    </VStack>
  );
};
