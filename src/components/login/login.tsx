import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { LoginService } from "@/services/servLogin";
import { AxiosService } from "@/services/servAxios";
import { toast } from "sonner";
import { Api } from "@/api/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type LoginData = {
  userId: string;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await Api.get<null, LoginData>("loggin", {
        headers: {
          username: username,
          token: password,
        },
      });

      LoginService.login(data.userId, username);
      AxiosService.setDefaultHeaders(data.userId);
      window.location.reload();
      toast.success("Login efetuado com sucesso");
    } catch (error) {
      toast.error(`Errro ao efetuar login: ${AxiosService.handleError(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto my-auto mt-[30vh]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre com seu usuário e{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" className="h-8 w-10">
                  PAT
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-base">
                  Para informações de como gerar o token clique{" "}
                  <a
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    href="https://learn.microsoft.com/pt-pt/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat"
                  >
                    aqui
                  </a>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{" "}
          do azure devops
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              placeholder="nome.sobrenome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Token (PAT)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
