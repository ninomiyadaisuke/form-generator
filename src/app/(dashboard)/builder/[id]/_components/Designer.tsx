'use client';

import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import React from 'react';

import { cn, idGenerator } from '@/lib/utils';

import { useDesigner } from '../_hooks';
import { ElementsType } from '../_types';

import DesignerElementWrapper from './DesignerElementWrapper';
import DesignerSidebar from './DesignerSidebar';
import { FormElements } from './FormElements';

const Designer = () => {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;
      const type = active.data.current?.type as ElementsType;
      const newElement = FormElements[type].construct(idGenerator());
      addElement(elements.length, newElement);
    },
  });

  return (
    <div className="flex size-full">
      <div className="w-full p-4">
        <div
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-4 ring-primary ring-inset',
          )}
          ref={droppable.setNodeRef}
        >
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex grow items-center text-3xl font-bold text-muted-foreground">Drop here</p>
          )}

          {elements.length > 0 && (
            <div className="flex w-full flex-col gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper element={element} key={element.id} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
