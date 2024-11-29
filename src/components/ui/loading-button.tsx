import { Button } from "./button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  isLoading: boolean;
}

const LoadingButton = ({ isLoading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        "Entrar"
      )}
    </Button>
  );
};

export default LoadingButton;
