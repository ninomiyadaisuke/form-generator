'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { FormElementInstance } from '../_types';

import { FormElements } from './FormElements';

const DesignerElementWrapper = ({ element }: { element: FormElementInstance }) => {
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      className={cn(
        'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
      )}
    >
      <DesignerElement elementInstance={element} />
    </div>
  );
};

export default DesignerElementWrapper;
