'use client';

import { atom, useAtom } from 'jotai';

import { FormElementInstance } from '../_types';

const elementsContexts = atom<FormElementInstance[]>([]);

const selectedElement = atom<FormElementInstance | null>(null);

export const useDesigner = () => {
  const [elements, setElements] = useAtom(elementsContexts);
  const [selectElement, setSelectElement] = useAtom(selectedElement);

  return {
    elements,
    setElements,
    selectElement,
    setSelectElement,
  };
};
