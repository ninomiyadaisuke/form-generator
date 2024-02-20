'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import React, { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { useDesigner } from '../_hooks';
import { FormElementInstance } from '../_types';

import { FormElements } from './FormElements';

const DesignerElementWrapper = ({ element }: { element: FormElementInstance }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, setSelectedElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative flex h-[120px] flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={draggable.setNodeRef}
    >
      <div className="absolute h-1/2 w-full rounded-t-md" ref={topHalf.setNodeRef} />
      <div className="absolute bottom-0 h-1/2 w-full rounded-b-md" ref={bottomHalf.setNodeRef} />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex h-full justify-center rounded-md rounded-l-none bg-red-500"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
              variant={'outline'}
            >
              <BiSolidTrash className="size-6" />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm text-muted-foreground">Click for properties or drag to move</p>
          </div>
        </>
      )}
      {topHalf.isOver && <div className="absolute top-0 h-[7px] w-full rounded-md rounded-b-none bg-primary"></div>}
      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30',
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && <div className="absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none bg-primary" />}
    </div>
  );
};

export default DesignerElementWrapper;
