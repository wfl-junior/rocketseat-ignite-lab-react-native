import { Button as NativeBaseButton, Heading, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  ...props
}) => (
  <NativeBaseButton
    bg={variant === "secondary" ? "transparent" : "green.700"}
    h={14}
    rounded="sm"
    _pressed={{
      bg: variant === "primary" ? "green.500" : undefined,
      opacity: 0.7,
    }}
    borderWidth={1}
    borderColor="green.700"
    {...props}
  >
    <Heading
      color={variant === "secondary" ? "green.700" : "white"}
      fontSize="sm"
    >
      {title}
    </Heading>
  </NativeBaseButton>
);
