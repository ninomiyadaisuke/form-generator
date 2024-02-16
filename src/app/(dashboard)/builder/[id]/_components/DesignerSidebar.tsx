import React from 'react';

import { useDesigner } from '../_hooks';

import { FormElements } from './FormElements';
import PropertiesFormSidebar from './PropertiesFormSidebar';
import SidebarButtonElement from './SidebarButtonElement';

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="flex h-full w-[400px] max-w-[400px] grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4">
      {!selectedElement && <SidebarButtonElement formElement={FormElements.TextField} />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
