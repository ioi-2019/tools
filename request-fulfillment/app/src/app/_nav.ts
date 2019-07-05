interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
    {
        title: true,
        name: 'General'
    },
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
    },
    {
        name: 'Users',
        url: '/users',
        icon: 'icon-user',
    },
    {
        name: 'Taks',
        url: '/tasks',
        icon: 'icon-check',
    },
];
