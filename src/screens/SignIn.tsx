import { zodResolver } from "@hookform/resolvers/zod";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Heading,
  Icon,
  KeyboardAvoidingView,
  useTheme,
  VStack,
} from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import * as zod from "zod";
import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";

const signInValidationSchema = zod.object({
  email: zod
    .string({ required_error: "O e-mail é obrigatório" })
    .email("Digite um e-mail válido"),
  password: zod.string({ required_error: "A senha é obrigatória" }),
});

type SignInFormData = zod.infer<typeof signInValidationSchema>;

export const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInValidationSchema),
  });

  async function handleSignIn({ email, password }: SignInFormData) {
    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      setIsLoading(false);

      let errorMessage = "Não foi possível entrar.";

      if (
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

  function handleSignUp() {
    navigate("signUp");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Box flex={1} bg="gray.600">
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={24}>
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
              Acesse sua conta
            </Heading>

            <FormInput
              placeholder="E-mail"
              keyboardType="email-address"
              mb={4}
              InputLeftElement={
                <Icon ml={4} as={<Envelope color={colors.gray[300]} />} />
              }
              name="email"
              control={control}
              error={errors.email?.message}
            />

            <FormInput
              placeholder="Senha"
              secureTextEntry
              mb={8}
              InputLeftElement={
                <Icon ml={4} as={<Key color={colors.gray[300]} />} />
              }
              name="password"
              control={control}
              error={errors.password?.message}
            />

            <Button
              title="Entrar"
              w="full"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />

            <Button
              variant="secondary"
              my={4}
              title="Criar sua conta"
              w="full"
              onPress={handleSignUp}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
};
