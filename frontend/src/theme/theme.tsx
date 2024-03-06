import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
  }

  interface ThemeOptions {
    primaryAppBar?: {
      height?: number;
    };
  }
}

export const createMuiTheme = () => {
  const theme = createTheme({
    primaryAppBar: {
      height: 50,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    },
  });

  return theme;
};

export default createMuiTheme;
