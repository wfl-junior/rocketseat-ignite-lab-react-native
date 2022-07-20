import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Loading } from "../components/Loading";
import { Order, OrderState, OrderStatus } from "../components/Order";
import { OrderDTO } from "../DTOs/OrderDTO";
import { firestoreDateFormat } from "../utils/firestoreDateFormat";

export const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("open");
  const [orders, setOrders] = useState<OrderState[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection<OrderDTO>("orders")
      .where("status", "==", selectedStatus)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map((document): OrderState => {
          const { patrimony, description, status, created_at } =
            document.data();

          return {
            id: document.id,
            patrimony,
            description,
            status,
            when: firestoreDateFormat(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [selectedStatus]);

  function handleNewOrder() {
    navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigate("details", { orderId });
  }

  async function handleSignOut() {
    try {
      await auth().signOut();
    } catch (error) {
      console.warn(error);
      Alert.alert("Sair", "Não foi possível sair.");
    }
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        alignItems="center"
        justifyContent="space-between"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleSignOut}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            onPress={() => setSelectedStatus("open")}
            isActive={selectedStatus === "open"}
          />

          <Filter
            type="closed"
            title="Finalizadas"
            onPress={() => setSelectedStatus("closed")}
            isActive={selectedStatus === "closed"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={order => order.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item: order }) => (
              <Order
                order={order}
                onPress={() => handleOpenDetails(order.id)}
              />
            )}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui
                  {"\n"}
                  solicitações{" "}
                  {selectedStatus === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};
