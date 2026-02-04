import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SidebarTriggerPortal } from '@/components/layout/SidebarTriggerPortal';
import { SidebarFoundationLogo } from '@/components/layout/SidebarFoundationLogo';
import { SidebarSectionTitle } from '@/components/layout/SidebarSectionTitle';

export function baseOptions() {
  return {
    nav: {
      title: null,
      children: <SidebarTriggerPortal />,
    },
    sidebar: {
      collapsible: false,
      footer: <SidebarFoundationLogo />,
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
