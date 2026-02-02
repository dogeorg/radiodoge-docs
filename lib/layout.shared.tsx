import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SidebarSectionTitle } from '@/components/layout/SidebarSectionTitle';

export function baseOptions() {
  return {
    nav: {
      title: 'RadioÐoge',
    },
    sidebar: {
      collapsible: false,
      components: {
        Separator: SidebarSectionTitle,
      },
    },
    searchToggle: {
      enabled: true,
    },
    themeSwitch: {
      enabled: true,
      mode: 'light-dark' as const,
    },
  };
}
