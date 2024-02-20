'use client';

import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import React from 'react';

import { cn, idGenerator } from '@/lib/utils';

import { useDesigner } from '../_hooks';
import { ElementsType, FormElementInstance } from '../_types';

import DesignerElementWrapper from './DesignerElementWrapper';
import DesignerSidebar from './DesignerSidebar';
import { FormElements } from './FormElements';

const Designer = () => {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useDesigner();
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

      // First scenario
      const isDesignerButtonElement = active.data?.current?.isDesignerButtonElement as boolean;
      const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea as boolean;
      const droppingSidebarButtonOverDesignerDropArea = isDesignerButtonElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarButtonOverDesignerDropArea) {
        const type = active.data.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idGenerator());
        addElement(elements.length, newElement);
      }

      // Second scenario
      const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement as boolean;
      const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement as boolean;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;
      const droppingSidebarButtonOverDesingerElement = isDesignerButtonElement && isDroppingOverDesignerElement;
      if (droppingSidebarButtonOverDesingerElement) {
        const type = active.data?.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idGenerator());
        const overId = over.data?.current?.elementId as string;
        console.log('overId', overId);

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (overElementIndex === -1) {
          throw new Error('element not found');
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, newElement);
        return;
      }
      // Third scenario

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement as boolean;
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId as string;
        const overId = over.data?.current?.elementId as string;

        const activeElementIndex = elements.findIndex((el) => el.id === activeId);
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('element not found');
        }

        const activeElement = { ...elements[activeElementIndex] } as FormElementInstance;
        removeElement(activeId);

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

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
