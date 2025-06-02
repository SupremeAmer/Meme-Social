import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;