import { LoginService } from "@/services/servLogin";
import {
  EnumUpdatePrIntervalToCombo,
  stringUpdateIntervalToEnum,
} from "@/types/UpdatePrInterval";
import { RefreshCcwIcon } from "lucide-react";
import { useManagerContext } from "../contexts/manager-context";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import ManagerOptions from "./options/manager.options";

type Props = {
  prQuant: number;
};

const ManagerHeader = ({ prQuant }: Props) => {
  const username = localStorage.getItem("@username");
  const { doSetShouldUpdate, doSetUpdateInterval, doSetIsLoadingBtnUpdate, isLoadingBtnUpdate } = useManagerContext();
  const handleLogout = () => {
    LoginService.logout();
    window.location.reload();
  };

  const handleClickRefresh = () => {
    doSetShouldUpdate(true);
    doSetIsLoadingBtnUpdate(true);
  };

  return (
    <div>
      <div className="w-full flex justify-between">
        <h1 className="text-lg">Bem vindo: {username}</h1>
        <h1 className="text-3xl font-bold">PR Manager</h1>
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
            Atualizar {isLoadingBtnUpdate ? <RefreshCcwIcon className="animate-spin" /> : <RefreshCcwIcon />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagerHeader;
