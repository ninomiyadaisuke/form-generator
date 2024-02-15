'use client';

import { atom, useAtom } from 'jotai';

import { FormElementInstance } from '../_types';

const elementsContexts = atom<FormElementInstance[]>([]);

const selectedElementContext = atom<FormElementInstance | null>(null);

export const useDesigner = () => {
  const [elements, setElements] = useAtom(elementsContexts);
  const [selectedElement, setSelectElement] = useAtom(selectedElementContext);

  return {
    elements,
    setElements,
    selectedElement,
    setSelectElement,
  };
};
