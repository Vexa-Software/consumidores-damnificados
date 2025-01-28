import { createTheme } from '@mui/material';

export const createMuiTheme = (rootElement: HTMLElement) => {
  return createTheme({
    palette: {
      primary: { main: '#013E6E' },
      secondary: { main: '#014F8D' },
    },
    typography: {
      fontFamily: ['Merriweather Sans', 'Merriweather', 'serif'].join(','),
      button: {
        fontSize: 16,
        fontWeight: 400,
      },
    },
    components: {
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: rootElement,
        },
      },
    },
  });
};
