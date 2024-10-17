import Sidebar from "./components/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import Router from "./router/router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Sidebar />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
