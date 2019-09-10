import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

const {
  css,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<any>;

export interface IThemeInterface {
  fontFamily: string;
  defaultFontSize: string;
  green: string;
  darkGreen: string;
}

export const theme: IThemeInterface = {
  fontFamily: 'Roboto, sans-seriff',
  defaultFontSize: '14px',
  green: '#aaaa',
  darkGreen: '',
};

export { css, keyframes, ThemeProvider };

