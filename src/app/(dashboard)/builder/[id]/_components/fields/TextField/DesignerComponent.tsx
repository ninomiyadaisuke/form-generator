import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FormElementInstance } from '@/app/(dashboard)/builder/[id]/_types';

import { CustomInstance } from '.';

export const DesignerComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Input disabled placeholder={placeHolder} readOnly />
      {helperText && <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>}
    </div>
  );
};

export default DesignerComponent;
