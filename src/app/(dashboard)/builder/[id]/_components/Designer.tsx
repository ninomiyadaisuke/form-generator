'use client';



import { useDroppable } from '@dnd-kit/core';
import React from 'react';

import { cn } from '@/lib/utils';

import { useDesigner } from '../_hooks';

import DesignerSidebar from './DesignerSidebar';

const Designer = () => {
  const { elements } = useDesigner();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
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
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
