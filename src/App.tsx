import Login from "./components/login/login";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import InteralRouter from "./router/internalrouter";
import Router from "./router/router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("@token");

  const router = token ? <InteralRouter /> : <Router />;

  return (
    <ThemeProvider defaultTheme="dark">
      {<BrowserRouter>{router}</BrowserRouter>}
    </ThemeProvider>
  );
};

export default App;
