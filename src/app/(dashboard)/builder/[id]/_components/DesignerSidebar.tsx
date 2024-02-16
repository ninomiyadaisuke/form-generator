import React from 'react';

import { useDesigner } from '../_hooks';

import FormElementsSidebar from './FormElementsSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';


const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="flex h-full w-[400px] max-w-[400px] grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
