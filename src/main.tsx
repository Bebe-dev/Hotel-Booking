import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from '@chakra-ui/react';
import "./index.css";
//import { BrowserRouter } from "react-router";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider resetCSS={false}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
