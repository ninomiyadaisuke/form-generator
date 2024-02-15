import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';

import { ElementsType } from '../_types';

import { FormElements } from './FormElements';
import { SidebarButtonElementDragOverlay } from './SidebarButtonElement';

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  // console.log(draggedItem);

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

  const isSidebarButtonElement = draggedItem?.data?.current?.isDesignerButtonElement as boolean;

  if (isSidebarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;

    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
