import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { CssBaseline, ThemeProvider } from "@mui/material"
import createMuiTheme from "./theme/theme"

function App() {
  const theme = createMuiTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
