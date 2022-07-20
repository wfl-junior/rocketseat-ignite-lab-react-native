import { IInputProps, Input as NativeBaseInput } from "native-base";

interface InputProps extends IInputProps {}

export const Input: React.FC<InputProps> = (props, _ref) => (
  <NativeBaseInput
    ref={input => (_ref = input)}
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
  />
);
