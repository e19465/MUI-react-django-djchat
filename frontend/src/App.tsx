import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { CssBaseline } from "@mui/material";
import Explore from "./pages/Explore";
import ToggleColorMode from "./theme/ToggleColorMode";
import Server from "./pages/Server";
import LoginPage from "./pages/LoginPage";
import { AuthServiceProvider } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import TestLogin from "./pages/TestLogin";

function App() {
  const isLoggedIn = localStorage.getItem("IsLoggedIn") == "true";

  return (
    <AuthServiceProvider>
      <ToggleColorMode>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/testLogin" element={<TestLogin />} />
          <Route path="/explore/:categoryName" element={<Explore />} />
          <Route path="/server/:serverId/:channelId?" element={<Server />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ToggleColorMode>
    </AuthServiceProvider>
  );
}

export default App;
