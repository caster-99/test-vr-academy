import { ReactNode } from 'react';

export interface NavItemType {
  id: string;
  title: ReactNode | string;
  caption?: ReactNode | string;
  type: 'item' | 'group' | 'collapse';
  url?: string;
  icon?: any;
  disabled?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavItemType[];
  chip?: {
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    variant?: 'character' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    label?: ReactNode | string;
    avatar?: ReactNode | string;
  };
}

export interface MenuItems {
  items: NavItemType[];
}
