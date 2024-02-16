'use client';

import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import { FormElementInstance, SubmitFunction } from '../../../_types';

import { CustomInstance, TextFieldFormElement } from '.';

const FormComponent = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) => {
  const element = elementInstance as CustomInstance;

  const { label, required, placeHolder, helperText } = element.extraAttributes;

  const [error, setError] = useState(false);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && '*'}
      </Label>
      <Input
        className={cn(error && 'border-red-500')}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(elementInstance, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeHolder}
        value={value}
      />
      {helperText && <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>}
    </div>
  );
};

export default FormComponent;
