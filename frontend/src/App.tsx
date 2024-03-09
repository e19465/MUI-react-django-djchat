import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createMuiTheme from "./theme/theme";
import Explore from "./pages/Explore";

function App() {
  const theme = createMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:categoryName" element={<Explore />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
