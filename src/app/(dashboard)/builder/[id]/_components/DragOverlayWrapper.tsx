import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';

import { useDesigner } from '../_hooks';
import { ElementsType } from '../_types';

import { FormElements } from './FormElements';
import { SidebarButtonElementDragOverlay } from './SidebarButtonElement';


const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;
  let node = <div>No drag overlay</div>;
  const isSidebarBtnElement = draggedItem?.data.current?.isDesignerButtonElement as ElementsType;
  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesingerElement = draggedItem?.data.current?.isDesignerElement as boolean;
  if (isDesingerElement) {
    const elementId = draggedItem.data?.current?.elementId as string;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent = FormElements[element.type].designerComponent;
      node = (
        <div className="pointer-events-none flex h-[120px] w-full cursor-pointer rounded-md border bg-accent px-4 py-2 opacity-80">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
