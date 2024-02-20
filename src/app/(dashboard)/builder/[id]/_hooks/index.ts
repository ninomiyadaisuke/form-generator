'use client';

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { atom, useAtom } from 'jotai';

import { idGenerator } from '@/lib/utils';

import { FormElements } from '../_components/FormElements';
import { ElementsType, FormElementInstance } from '../_types';

const elementsContexts = atom<FormElementInstance[]>([]);

const selectedElementContext = atom<FormElementInstance | null>(null);

export const useDesigner = () => {
  const [elements, setElements] = useAtom(elementsContexts);
  const [selectedElement, setSelectedElement] = useAtom(selectedElementContext);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((element) => element.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return {
    elements,
    addElement,
    removeElement,
    updateElement,
    setElements,
    selectedElement,
    setSelectedElement,
  };
};

export const useDragAndDrop = () => {
  const { elements, addElement, removeElement } = useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
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

  return { droppable };
};
