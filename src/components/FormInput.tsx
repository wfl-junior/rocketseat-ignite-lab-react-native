import { IInputProps, Text, VStack } from "native-base";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "./Input";

interface InputProps<T extends FieldValues = FieldValues> extends IInputProps {
  name: Path<T>;
  control: Control<T>;
  error?: string;
}

export const FormInput = <T extends FieldValues = FieldValues>({
  m,
  mt,
  mr,
  mb,
  ml,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  mx,
  my,
  marginX,
  marginY,
  name,
  control,
  error,
  ...props
}: InputProps<T>): JSX.Element => (
  <VStack
    w="full"
    m={m}
    mt={mt}
    mr={mr}
    mb={mb}
    ml={ml}
    margin={margin}
    marginTop={marginTop}
    marginRight={marginRight}
    marginBottom={marginBottom}
    marginLeft={marginLeft}
    mx={mx}
    my={my}
    marginX={marginX}
    marginY={marginY}
  >
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input
          bg="gray.700"
          h={14}
          size="md"
          borderWidth={1}
          borderColor="transparent"
          fontSize="md"
          fontFamily="body"
          color="white"
          placeholderTextColor="gray.300"
          _focus={{
            borderWidth: 1,
            borderColor: "green.500",
            bg: "gray.700",
          }}
          {...props}
          value={value}
          onChangeText={onChange}
        />
      )}
    />

    {!!error && (
      <Text color="red.500" mt={1}>
        {error}
      </Text>
    )}
  </VStack>
);
