import { Button, IButtonProps, Text, useTheme } from "native-base";
import { OrderStatus } from "./Order";

interface FilterProps extends IButtonProps {
  title: string;
  isActive?: boolean;
  type: OrderStatus;
}

export const Filter: React.FC<FilterProps> = ({
  title,
  isActive = false,
  type,
  ...props
}) => {
  const { colors } = useTheme();

  const colorType = type === "open" ? colors.secondary[700] : colors.green[300];

  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...props}
    >
      <Text
        color={isActive ? colorType : "gray.300"}
        fontSize="xs"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
};
