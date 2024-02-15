'use client';

import { atom, useAtom } from 'jotai';

import { FormElementInstance } from '../_types';

const elementsContexts = atom<FormElementInstance[]>([]);

const selectedElementContext = atom<FormElementInstance | null>(null);

export const useDesigner = () => {
  const [elements, setElements] = useAtom(elementsContexts);
  const [selectedElement, setSelectElement] = useAtom(selectedElementContext);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  return {
    elements,
    addElement,
    setElements,
    selectedElement,
    setSelectElement,
  };
};
