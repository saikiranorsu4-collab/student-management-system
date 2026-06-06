import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter }
from "react-router-dom";

import App from "./App";

import "./index.css";

import { Toaster }
from "react-hot-toast";

import { AuthProvider }
from "./context/AuthContext";

import { ThemeProvider }
from "./context/ThemeContext";

import {
  SearchProvider,
} from "./context/SearchContext";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <ThemeProvider>

          <SearchProvider>

          <App />
           
          <Toaster
            position="top-right"
          />
          
          </SearchProvider>

        </ThemeProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);