import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Detail from "./detail.jsx";
import { TodoContextProvider } from "./context/TodoContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/todo/:id" element={<Detail />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </TodoContextProvider>
  </StrictMode>,
);
