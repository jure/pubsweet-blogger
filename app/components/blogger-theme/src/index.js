/* eslint-disable import/extensions */
import 'typeface-fira-sans-condensed'
import 'typeface-vollkorn'

import {
  Action,
  ActionGroup,
  AppBar,
  Button,
  Checkbox,
  GlobalStyle,
  Radio,
  TextField,
  Menu,
  Logo,
} from './elements'

const cokoTheme = {
  /* Colors */
  colorBackground: 'white',
  colorPrimary: '#0B65CB',
  colorSecondary: '#E7E7E7',
  colorFurniture: '#CCC',
  colorBorder: '#AAA',
  colorBackgroundHue: '#F1F1F1',
  colorSuccess: '#008800',
  colorError: '#FF2D1A',
  colorText: '#111',
  colorTextReverse: '#FFF',
  colorTextPlaceholder: '#595959',
  colorWarning: '#ffc107',

  // TODO -- not used anywhere
  //   $colorInteract: var($colorPrimaryDarker);
  // $colorPrimaryDarker: #0551a8

  /* Text variables */

  // fonts
  fontInterface: "'Fira Sans Condensed'",
  fontHeading: "'Fira Sans Condensed'",
  fontReading: "'Vollkorn'",
  fontWriting: "'Cokourier Prime Sans'",

  // font sizes
  fontSizeBase: '16px',
  fontSizeBaseSmall: '14px',
  fontSizeHeading1: '40px',
  fontSizeHeading2: '36px',
  fontSizeHeading3: '28px',
  fontSizeHeading4: '24px',
  fontSizeHeading5: '20px',
  fontSizeHeading6: '16px',

  // line heights
  lineHeightBase: '24px',
  lineHeightBaseSmall: '16px',
  lineHeightHeading1: '48px',
  lineHeightHeading2: '40px',
  lineHeightHeading3: '32px',
  lineHeightHeading4: '32px',
  lineHeightHeading5: '24px',
  lineHeightHeading6: '24px',

  /* Spacing */
  gridUnit: '8px',

  /* Border */
  borderRadius: '0',
  borderWidth: '1px', // julien: not 0
  borderStyle: 'solid',

  // Does not exist
  // $borderColor: var($colorFurniture);

  /* Shadow (for tooltip) */
  boxShadow: '0 2px 4px 0 rgba(51, 51, 51, 0.3)',

  /* Transition */
  transitionDuration: '0.2s', // TODO -- julien: not 0.05s
  transitionTimingFunction: 'ease',
  transitionDelay: '0',

  cssOverrides: {
    Login: {
      Logo,
    },
    ui: {
      Action,
      ActionGroup,
      AppBar,
      Button,
      Checkbox,
      GlobalStyle,
      Radio,
      TextField,
      Menu,
    },
  },
}

export default cokoTheme
