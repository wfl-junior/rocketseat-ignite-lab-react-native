import { zodResolver } from "@hookform/resolvers/zod";
import auth from "@react-native-firebase/auth";
import { Box, Icon, KeyboardAvoidingView, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import * as zod from "zod";
import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { Header } from "../components/Header";

const signUpValidationSchema = zod
  .object({
    email: zod
      .string({ required_error: "O e-mail é obrigatório" })
      .email("Digite um e-mail válido"),
    password: zod
      .string({ required_error: "A senha é obrigatória" })
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
    passwordConfirmation: zod.string().optional(),
  })
  .refine(data => data.passwordConfirmation === data.password, {
    message: "As senhas devem ser iguais",
    path: ["passwordConfirmation"],
  });

type SignUpFormData = zod.infer<typeof signUpValidationSchema>;

export const SignUp: React.FC = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpValidationSchema),
  });

  async function handleSignUp({ email, password }: SignUpFormData) {
    setIsLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
      Alert.alert("Entrar", "Não foi possível criar sua conta.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box bg="gray.600" flex={1}>
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={24}>
            <Logo />

            <Header title="Crie sua conta" />

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
              mb={4}
              InputLeftElement={
                <Icon ml={4} as={<Key color={colors.gray[300]} />} />
              }
              name="password"
              control={control}
              error={errors.password?.message}
            />

            <FormInput
              placeholder="Confirme sua senha"
              secureTextEntry
              mb={8}
              InputLeftElement={
                <Icon ml={4} as={<Key color={colors.gray[300]} />} />
              }
              name="passwordConfirmation"
              control={control}
              error={errors.passwordConfirmation?.message}
            />

            <Button
              title="Criar conta"
              w="full"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
              mb={4}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
};
