export const DASHBOARD_PATH = '/sample-page';
export const DEFAULT_THEME_MODE = 'system';

export const CSS_VAR_PREFIX = '';

export interface AppConfig {
  fontFamily: string;
  borderRadius: number;
  outlinedFilled?: boolean;
  presetColor?: string;
}

const config: AppConfig = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8
};

export default config;
