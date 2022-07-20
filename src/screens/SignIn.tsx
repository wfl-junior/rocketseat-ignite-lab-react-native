import auth from "@react-native-firebase/auth";
import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import { Alert } from "react-native";
import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha.");
    }

    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      setIsLoading(false);

      let errorMessage = "Não foi possível entrar.";

      if (error.code === "auth/invalid-email") {
        errorMessage = "E-mail inválido.";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Credenciais inválidas.";
      } else {
        console.warn(error);
      }

      Alert.alert("Entrar", errorMessage);
    }
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        mb={4}
        value={email}
        onChangeText={setEmail}
        InputLeftElement={
          <Icon ml={4} as={<Envelope color={colors.gray[300]} />} />
        }
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        mb={8}
        value={password}
        onChangeText={setPassword}
        InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
};
