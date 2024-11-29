import { LoginService } from "@/services/servLogin";
import ManagerOptions from "./options/manager.options";
import { Button } from "../ui/button";
import { useManagerContext } from "../contexts/manager-context";
import { RefreshCcwIcon } from "lucide-react";
import {
  EnumUpdatePrIntervalToCombo,
  stringUpdateIntervalToEnum,
} from "@/types/UpdatePrInterval";
import { Combobox } from "../ui/combobox";

type Props = {
  prQuant: number;
};

const ManagerHeader = ({ prQuant }: Props) => {
  const username = localStorage.getItem("@username");
  const { setShouldUpdate, doSetUpdateInterval } = useManagerContext();
  const handleLogout = () => {
    LoginService.logout();
    window.location.reload();
  };

  const handleClickRefresh = () => {
    setShouldUpdate(true);
  };

  return (
    <div>
      <div className="w-full flex justify-between">
        <h1 className="text-lg">Bem vindo: {username}</h1>
        <h1 className="text-3xl font-bold">PR MANAGER</h1>
        <div className="flex items-center gap-4">
          <p
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={handleLogout}
          >
            Deslogar
          </p>
          <ManagerOptions />
        </div>
      </div>
      <div className="w-full flex justify-between mt-2 items-center">
        <h1 className="text-md border border-slate-600 p-2 rounded-md bg-slate-600">
          {`${prQuant} Pull Requests pendentes`}
        </h1>
        <div className="flex items-center gap-2">
          <Combobox
            placeholder="Tempo de atualização"
            items={EnumUpdatePrIntervalToCombo}
            onSelect={(value) => {
              doSetUpdateInterval(stringUpdateIntervalToEnum(value));
            }}
          />
          <Button onClick={handleClickRefresh} variant="secondary">
            Atualizar <RefreshCcwIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagerHeader;
