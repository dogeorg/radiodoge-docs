'use client';

import type { FC } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';

/**
 * Renders sidebar section titles (non-clickable) with no icon and smaller font
 * to differentiate from clickable menu items.
 */
export const SidebarSectionTitle: FC<{ item: PageTree.Separator }> = ({ item }) => {
  return (
    <p className="sidebar-section-title" data-non-clickable>
      {item.name}
    </p>
  );
};
