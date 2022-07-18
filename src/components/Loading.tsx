import { Center, Spinner } from "native-base";

export const Loading: React.FC = () => (
  <Center flex={1} bg="gray.700">
    <Spinner
      color="secondary.700"
      size="lg"
      accessibilityLabel="Carregando App"
    />
  </Center>
);
