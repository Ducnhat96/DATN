import { ThemeOptions } from '@material-ui/core/es/styles/createMuiTheme';
import { createMuiTheme } from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { FontStyleOptions, TypographyOptions } from '@material-ui/core/styles/createTypography';
import Blue from '@material-ui/core/colors/blue';
import Red from '@material-ui/core/colors/red';
import Orange from '@material-ui/core/colors/orange';
import { BreakpointsOptions } from '@material-ui/core/styles/createBreakpoints';

interface PaletteExtra extends PaletteOptions {
  button: any;
}

export interface ThemeCustom extends ThemeOptions {
  palette?: PaletteExtra;
  typography?: TypographyOptions | FontStyleOptions;
  breakpoints?: BreakpointsOptions;
}

const options: ThemeCustom = {
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Nunito Sans, sans-serif',

  },
  palette: {
    primary: {
      main: "#25858a",

    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: Red[600],
    },
    button: {
      nav: '64px',
    },
  },
};

const theme = createMuiTheme(options);

export default theme;
