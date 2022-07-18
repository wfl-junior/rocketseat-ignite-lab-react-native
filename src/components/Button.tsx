import { Button as NativeBaseButton, Heading, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => (
  <NativeBaseButton
    bg="green.700"
    h={14}
    rounded="sm"
    _pressed={{ bg: "green.500" }}
    {...props}
  >
    <Heading color="white" fontSize="sm">
      {title}
    </Heading>
  </NativeBaseButton>
);
