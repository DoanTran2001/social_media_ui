import React from "react";
import logo from "./logo.svg";
import "./App.css";
import useRoutesElement from "./hooks/useRoutesElement";
import { themeOptions } from "./themes/theme";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme(themeOptions);

function App() {
  const routes = useRoutesElement();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routes}
    </ThemeProvider>
  );
}

export default App;
