import EnumUpdatePrInterval from "@/types/UpdatePrInterval";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type IManagerContext = {
  shouldUpdate: boolean;
  setShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  doUpdatePrIds: (prIds: number[]) => void;
  doSetUpdateInterval: (interval: EnumUpdatePrInterval) => void;
};

const ManagerContext = createContext<IManagerContext>({} as IManagerContext);

export const useManagerContext = () => {
  const context = useContext(ManagerContext);

  if (!context) {
    throw new Error("useManagerContext must be used within a ManagerContext");
  }

  return context;
};

export const ManagerContextProvider = ({ children }: PropsWithChildren) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [prIds, setPrIds] = useState<number[]>([]);
  const [updateInterval, setUpdateInterval] = useState(
    EnumUpdatePrInterval.NOT_DEFINED
  );

  const doSetUpdateInterval = (interval: EnumUpdatePrInterval) => {
    setUpdateInterval(interval);
  };

  useEffect(() => {
    if (updateInterval === EnumUpdatePrInterval.NOT_DEFINED) return;
    const interval = setInterval(() => {
      setShouldUpdate(true);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  const doUpdatePrIds = (newPrIds: number[]) => {
    if (newPrIds.some((prId) => !prIds.includes(prId))) {
      if (!("Notification" in window)) {
        alert("Este navegador não suporta notificações do sistema");
        return;
      }

      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Novas PR's adicionadas", {
            body: "Existem novas PR's pentendes",
          });
        }
      });
    }

    setPrIds(newPrIds);
  };

  return (
    <ManagerContext.Provider
      value={{
        shouldUpdate,
        setShouldUpdate,
        doUpdatePrIds,
        doSetUpdateInterval
      }}
    >
      {children}
    </ManagerContext.Provider>
  );
};
