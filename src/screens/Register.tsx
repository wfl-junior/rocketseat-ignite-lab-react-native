import { zodResolver } from "@hookform/resolvers/zod";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import * as zod from "zod";
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { Header } from "../components/Header";
import { useAuthContext } from "../contexts/AuthContext";
import { OrderDTO } from "../DTOs/OrderDTO";

const signInValidationSchema = zod.object({
  patrimony: zod.string({ required_error: "O patrimônio é obrigatório" }),
  description: zod.string({ required_error: "A descrição é obrigatória" }),
});

type CreateNewOrderFormData = zod.infer<typeof signInValidationSchema>;

export const Register: React.FC = () => {
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateNewOrderFormData>({
    resolver: zodResolver(signInValidationSchema),
  });

  async function handleNewOrder(data: CreateNewOrderFormData) {
    setIsLoading(true);

    try {
      const newOrder: OrderDTO = {
        ...data,
        user_uid: user!.uid,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp() as any,
      };

      await firestore().collection("orders").add(newOrder);

      goBack();
    } catch (error) {
      console.warn(error);
      setIsLoading(false);

      Alert.alert("Solicitação", "Não foi possível registrar o pedido.");
    }
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <VStack flex={1} pt={2} px={6} pb={6} bg="gray.600">
        <Header title="Solicitação" />

        <FormInput
          placeholder="Número do Patrimônio"
          mt={4}
          name="patrimony"
          control={control}
          error={errors.patrimony?.message}
        />

        <FormInput
          placeholder="Descrição do problema"
          mt={5}
          flex={1}
          multiline
          textAlignVertical="top"
          name="description"
          control={control}
          error={errors.description?.message}
        />

        <Button
          title="Cadastrar"
          mt={5}
          onPress={handleSubmit(handleNewOrder)}
          isLoading={isLoading}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
};
