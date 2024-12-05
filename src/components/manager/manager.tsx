import { Api } from "@/api/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRCollection } from "@/types/PullRequests";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useManagerContext } from "../contexts/manager-context";
import ManagerHeader from "./manager.header";
import { AxiosService } from "@/services/servAxios";
import { MessageSquareMore } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Manager() {
  const [collections, setCollections] = useState<PRCollection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<
    PRCollection[]
  >([]);
  const [prQuant, setPrQuant] = useState(0);
  const {
    shouldUpdate,
    doSetShouldUpdate,
    doUpdatePrIds,
    isLoadingBtnUpdate,
    doSetIsLoadingBtnUpdate,
    shouldUpdateConnections,
    doSetShouldUpdateConnections,
    query,
  } = useManagerContext();

  useEffect(() => {
    if (!shouldUpdate) return;
    getPrs();
    doSetShouldUpdate(false);
  }, [shouldUpdate]);

  useEffect(() => {
    atualizeConnections();
  }, []);

  useEffect(() => {
    if (!shouldUpdateConnections) return;
    atualizeConnections();
    doSetShouldUpdateConnections(false);
  }, [shouldUpdateConnections]);

  useEffect(() => {
    if (query === "") {
      setFilteredCollections(collections);
      return;
    }

    const newFilteredCollections = collections
      .map((collection) => ({
        ...collection,
        projects: collection.projects
          .map((project) => ({
            ...project,
            pullRequests: project.pullRequests.filter((pr) =>
              pr.name.toLowerCase().includes(query.toLowerCase())
            ),
          }))
          .filter((project) => project.pullRequests.length > 0),
      }))
      .filter((collection) => collection.projects.length > 0);

    setFilteredCollections(newFilteredCollections);
  }, [query, collections]);

  const getPrs = async () => {
    try {
      const data = await Api.get<null, PRCollection[]>("pullRequests");

      setCollections(data);

      setPrQuant(
        data.reduce((acc, collection) => acc + collection.pendingQuant, 0)
      );

      const prIds = data.flatMap((collection) =>
        collection.projects.flatMap((project) =>
          project.pullRequests.map((pr) => pr.id)
        )
      );

      doUpdatePrIds(prIds);
    } catch (error: unknown) {
      toast.error(
        `Ocorreu um erro ao buscar as Pull requests: ${AxiosService.handleError(
          error
        )}`
      );
    } finally {
      if (isLoadingBtnUpdate) doSetIsLoadingBtnUpdate(false);
    }
  };

  const atualizeConnections = async () => {
    try {
      const data = await Api.post<null, PRCollection[]>("atualizeConnections");

      setCollections(data);

      setPrQuant(
        data.reduce((acc, collection) => acc + collection.pendingQuant, 0)
      );

      const prIds = data.flatMap((collection) =>
        collection.projects.flatMap((project) =>
          project.pullRequests.map((pr) => pr.id)
        )
      );

      doUpdatePrIds(prIds);
      toast.success("Pull requests em uso atualizadas com sucesso"!);
    } catch (error: unknown) {
      toast.error(
        `Ocorreu um erro ao buscar as Pull requests: ${AxiosService.handleError(
          error
        )}`
      );
    } finally {
      if (isLoadingBtnUpdate) doSetIsLoadingBtnUpdate(false);
    }
  };

  return (
    <div className="m-10 h-full">
      <ManagerHeader prQuant={prQuant} />
      {
        <Accordion
          type="multiple"
          className="border border-gray-700 rounded-lg shadow-lg p-4 mt-5"
        >
          {filteredCollections.map((collection) => (
            <AccordionItem
              key={collection.id}
              value={collection.id}
              className="mb-4"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-100 bg-gray-800 p-3 rounded-md hover:bg-gray-700">
                {collection.name} ({collection.pendingQuant} pendentes)
              </AccordionTrigger>
              <AccordionContent className="ml-4 mt-2 border-l-4 border-gray-600 pl-4">
                {collection.projects.map((project) => (
                  <Accordion key={project.id} type="multiple" className="mb-3">
                    <AccordionItem value={project.id}>
                      <AccordionTrigger className="text-md font-medium text-gray-200 bg-gray-700 p-2 rounded-md hover:bg-gray-600">
                        {project.name} ({project.pendingQuant} pendentes)
                      </AccordionTrigger>
                      <AccordionContent className="ml-6 mt- border-l-4 border-gray-500 pl-3">
                        {project.pullRequests.map((pr) => (
                          <div
                            key={pr.id}
                            className="w-full flex flex-col gap-2 border border-gray-600 rounded-md bg-gray-800 p-3 mt-1 shadow-sm hover:shadow-md"
                          >
                            <a
                              href={pr.url}
                              target="_blank"
                              className="text-blue-400 font-medium hover:underline"
                              rel="noopener noreferrer"
                            >
                              {pr.name}
                            </a>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-gray-400">
                                {pr.ownerName} - {pr.repositoryName}
                              </p>
                              {pr.quantComents > 0 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <MessageSquareMore className="w-5" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-base">
                                        {pr.quantComents} comentário(s)
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      }
    </div>
  );
}
