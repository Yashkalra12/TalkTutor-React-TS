import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6F61",
    },
    secondary: {
      main: "#ACC196",
    },
    text: {
      primary: "#fff",
    },
    background: { default: "#355c7d" },
  },
  typography: {
    fontFamily: ["Inria Sans", "sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
