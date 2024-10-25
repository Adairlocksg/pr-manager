import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { CogIcon } from "lucide-react";

export default function Manager(/* { activeContent }: ManagerProps */) {
  const username = localStorage.getItem("@username");

  return (
    <div className="m-10 h-full">
      <div className="w-full flex justify-between">
        <h1 className="text-lg">
          Aqui são as PR's pendentes por aprovação {username}
        </h1>
        <Button>
          Configurar collections <CogIcon />
        </Button>
      </div>

      <Accordion type="multiple">
        <AccordionItem value="comercio">
          <AccordionTrigger>Comércio</AccordionTrigger>
          <AccordionContent>
            <a
              href="https://devops.useall.com.br/Com%C3%A9rcio/CRM/_git/AssistenteVendas/pullrequest/10273"
              target="_blank"
            >
              Pull Request 10273: 5188 - Teste - Manutenção interna - troca da
              DLL da mensageria, notificação e email.
            </a>
          </AccordionContent>
          <AccordionContent>
            <a
              href="https://devops.useall.com.br/Com%C3%A9rcio/CRM/_git/AssistenteVendas/pullrequest/10273"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Pull Request 10273: 5188 - Teste - Manutenção interna - troca da
              DLL da mensageria, notificação e email.
            </a>
          </AccordionContent>
          <AccordionContent>
            <a
              href="https://devops.useall.com.br/Com%C3%A9rcio/CRM/_git/AssistenteVendas/pullrequest/10273"
              target="_blank"
            >
              Pull Request 10273: 5188 - Teste - Manutenção interna - troca da
              DLL da mensageria, notificação e email.
            </a>
          </AccordionContent>
          <AccordionContent>
            <a
              href="https://devops.useall.com.br/Com%C3%A9rcio/CRM/_git/AssistenteVendas/pullrequest/10273"
              target="_blank"
            >
              Pull Request 10273: 5188 - Teste - Manutenção interna - troca da
              DLL da mensageria, notificação e email.
            </a>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Serviços">
          <AccordionTrigger>Serviços</AccordionTrigger>
          <AccordionContent>Pr de cria</AccordionContent>
          <AccordionContent>Pr de cria</AccordionContent>
          <AccordionContent>Pr de cria</AccordionContent>
          <AccordionContent>Pr de cria</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
