import {
  Card,
  CardContent
} from "@/components/ui/card";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const CardComponent = ({ children, style }: CardProps) => {
  return (
    <Card style={style}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
