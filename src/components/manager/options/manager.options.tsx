import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Api } from "@/api/api";
import { useManagerContext } from "@/components/contexts/manager-context";
import { Collections } from "@/types/Collections";
import { CogIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosService } from "@/services/servAxios";

const ManagerOptions = () => {
  const [collections, setCollections] = useState<Collections[]>([]);
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const { doSetShouldUpdate } = useManagerContext();

  const handleOpenChange = async () => {
    setOpenModalOptions(!openModalOptions);

    try {
      const data = await Api.get<null, Collections[]>("collectionsInUse");

      setCollections(data);
    } catch (error) {
      toast.error(`Erro ao buscar collections: ${error}`);
    }
  };

  const handleCheckChange = (id: string) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id
        ? { ...collection, inUse: !collection.inUse }
        : collection
    );
    setCollections(updatedCollections);
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await Api.post("collectionsForUse", { collections });
      toast.success("Collections salvas com sucesso");
      doSetShouldUpdate(true);
    } catch (error) {
      toast.error(
        `Erro ao salvar collections: ${AxiosService.handleError(error)}`
      );
    } finally {
      setOpenModalOptions(false);
    }
  };

  return (
    <AlertDialog open={openModalOptions} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button>
          Opções <CogIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Collections do usuário</AlertDialogTitle>
          <AlertDialogDescription>
            Selecione as collections que você deseja visualizar
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full px-2 rounded-sm flex justify-between">
          <p>Nome</p>
          <p>Em uso</p>
        </div>
        {collections.map((collection) => {
          return (
            <div
              key={collection.id}
              className="w-full border p-3 rounded-sm flex justify-between"
            >
              <p>{collection.name}</p>
              <Checkbox
                checked={collection.inUse}
                onCheckedChange={() => {
                  handleCheckChange(collection.id);
                }}
              />
            </div>
          );
        })}
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-900 border-none hover:bg-red-950">
            Cancelar <XIcon />
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm hover:text-accent-foreground h-9 px-4 py-2 mt-2 text-white sm:mt-0 bg-slate-800 hover:bg-slate-900"
          >
            Salvar <SaveIcon />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ManagerOptions;
