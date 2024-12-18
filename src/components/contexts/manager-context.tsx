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
  doSetShouldUpdate: (shouldUpdate: boolean) => void;
  doUpdatePrIds: (prIds: number[]) => void;
  doSetUpdateInterval: (interval: EnumUpdatePrInterval) => void;
  doSetIsLoadingBtnUpdate: (isLoading: boolean) => void;
  isLoadingBtnUpdate: boolean;
  doSetShouldUpdateConnections: (shouldUpdateConnections: boolean) => void;
  shouldUpdateConnections: boolean;
  query: string;
  doSetQuery: (query: string) => void;
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
  const [isLoadingBtnUpdate, setIsLoadingBtnUpdate] = useState(false);
  const [shouldUpdateConnections, setShouldUpdateConnections] = useState(false);
  const [query, setQuery] = useState("");
  const [updateInterval, setUpdateInterval] = useState(
    EnumUpdatePrInterval.NOT_DEFINED
  );

  const doSetUpdateInterval = (interval: EnumUpdatePrInterval) => {
    setUpdateInterval(interval);
  };

  const doSetIsLoadingBtnUpdate = (isLoading: boolean) => {
    setIsLoadingBtnUpdate(isLoading);
  };

  const doSetShouldUpdateConnections = (shouldUpdateConnections: boolean) => {
    setShouldUpdateConnections(shouldUpdateConnections);
  };

  const doSetShouldUpdate = (shouldUpdate: boolean) => {
    setShouldUpdate(shouldUpdate);
  };

  const doSetQuery = (query: string) => {
    setQuery(query);
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
        doSetShouldUpdate,
        doUpdatePrIds,
        doSetUpdateInterval,
        doSetIsLoadingBtnUpdate,
        isLoadingBtnUpdate,
        doSetShouldUpdateConnections,
        shouldUpdateConnections,
        query,
        doSetQuery,
      }}
    >
      {children}
    </ManagerContext.Provider>
  );
};
