import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import {
  CircleWavyCheck,
  ClipboardText,
  DesktopTower,
  Hourglass,
} from "phosphor-react-native";
import { Fragment, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { CardDetails } from "../components/CardDetails";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { OrderState } from "../components/Order";
import { OrderDTO } from "../DTOs/OrderDTO";
import { firestoreDateFormat } from "../utils/firestoreDateFormat";

interface OrderDetails extends OrderState {
  solution?: string;
  closed_at: string | null;
}

export interface DetailsRouteParams {
  orderId: string;
}

export const Details: React.FC = () => {
  const { colors } = useTheme();
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [solution, setSolution] = useState("");
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { orderId } = params as DetailsRouteParams;

  useEffect(() => {
    setIsOrderLoading(true);

    firestore()
      .collection<OrderDTO>("orders")
      .doc(orderId)
      .onSnapshot(document => {
        const data = document.data();

        if (data) {
          const {
            patrimony,
            description,
            status,
            created_at,
            closed_at,
            solution,
          } = data;

          setOrder({
            id: document.id,
            patrimony,
            description,
            status,
            solution,
            when: firestoreDateFormat(created_at),
            closed_at: closed_at ? firestoreDateFormat(closed_at) : null,
          });

          setIsOrderLoading(false);
        }
      }, console.warn);
  }, [orderId]);

  if (isOrderLoading) {
    return <Loading />;
  }

  async function handleCloseOrder() {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Informe a solução para encerrar a solicitação.",
      );
    }

    setIsClosing(true);

    try {
      await firestore().collection<OrderDTO>("orders").doc(orderId).update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert("Solicitação", "Solicitação encerrada com sucesso.");
      goBack();
    } catch (error) {
      console.warn(error);
      setIsClosing(false);
      Alert.alert("Solicitação", "Não foi possível encerrar a solicitação.");
    }
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box bg="gray.600" py={2} px={6}>
        <Header title="Solicitação" />
      </Box>

      {order ? (
        <Fragment>
          <HStack
            bg="gray.500"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            {order.status === "open" ? (
              <Hourglass size={22} color={colors.secondary[700]} />
            ) : (
              <CircleWavyCheck size={22} color={colors.green[300]} />
            )}

            <Text
              fontSize="sm"
              ml={2}
              textTransform="uppercase"
              color={
                order.status === "open"
                  ? colors.secondary[700]
                  : colors.green[300]
              }
            >
              {order.status === "open" ? "Em andamento" : "Finalizada"}
            </Text>
          </HStack>

          <ScrollView mx={6} showsVerticalScrollIndicator={false}>
            <CardDetails
              title="Equipamento"
              description={`Patrimônio ${order.patrimony}`}
              icon={DesktopTower}
            />

            <CardDetails
              title="Descrição do problema"
              description={order.description}
              icon={ClipboardText}
              footer={`Registrado em ${order.when}`}
            />

            <CardDetails
              title="Solução"
              icon={CircleWavyCheck}
              description={order.solution}
              footer={
                order.closed_at ? `Encerrada em ${order.closed_at}` : undefined
              }
            >
              {order.status === "open" && (
                <Input
                  placeholder="Descrição da solução"
                  value={solution}
                  onChangeText={setSolution}
                  textAlignVertical="top"
                  multiline
                  h={24}
                />
              )}
            </CardDetails>
          </ScrollView>

          {order.status === "open" && (
            <Button
              title="Encerrar solicitação"
              m={6}
              onPress={handleCloseOrder}
              isLoading={isClosing}
            />
          )}
        </Fragment>
      ) : (
        <Center>
          <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
            Houston, we have a problem!
          </Text>
        </Center>
      )}
    </VStack>
  );
};
