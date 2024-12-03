import { ThemeProvider } from "./components/theme-provider";
import InteralRouter from "./router/internalrouter";
import Router from "./router/router";
import { BrowserRouter } from "react-router-dom";
import { AxiosService } from "./services/servAxios";
import { Toaster } from "sonner";
import { ManagerContextProvider } from "./components/contexts/manager-context";

const App = () => {
  const token: string | null = localStorage.getItem("@token");

  const router: JSX.Element = token ? <InteralRouter /> : <Router />;

  AxiosService.setBaseUrl();
  AxiosService.setDefaultHeaders(token ?? "");
  return (
    <ThemeProvider defaultTheme="dark">
      <ManagerContextProvider>
        <Toaster position="top-center" />
        {<BrowserRouter>{router}</BrowserRouter>}
      </ManagerContextProvider>
    </ThemeProvider>
  );
};

export default App;
