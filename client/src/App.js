import "./styles/globals.css";
import "tailwindcss/tailwind.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages";
import Login from "./pages/Login";
import UserContextProvider from "./components/UserContext";
import ContextProvider from "./components/ContextProvider";
import AuthRoute from "./routes/authRoute";

function App() {
  return (
    <UserContextProvider>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <HomePage />
                </AuthRoute>
              }
            />

            <Route path="/login" element={<Login />} exact />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </UserContextProvider>
  );
}

export default App;
