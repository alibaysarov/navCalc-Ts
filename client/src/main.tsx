import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import { Provider } from 'react-redux';
import store from "./store/index.ts";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>

    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>

  </Provider>
);
