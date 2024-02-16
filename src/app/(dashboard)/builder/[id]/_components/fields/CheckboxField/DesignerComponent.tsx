'use client';

import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { FormElementInstance } from '@/app/(dashboard)/builder/[id]/_types';

import { CustomInstance } from '.';

export const DesignerComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && '*'}
        </Label>
        {helperText && <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>}
      </div>
    </div>
  );
};

export default DesignerComponent;
