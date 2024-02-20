'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { useDesigner, useDragAndDrop } from '../_hooks';

import DesignerElementWrapper from './DesignerElementWrapper';
import DesignerSidebar from './DesignerSidebar';

const Designer = () => {
  const { droppable } = useDragAndDrop();
  const { elements, selectedElement, setSelectedElement } = useDesigner();

  return (
    <div className="flex size-full">
      <div
        className="w-full p-4"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
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
