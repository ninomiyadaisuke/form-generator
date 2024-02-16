'use client';

import React, { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import { FormElementInstance, SubmitFunction } from '../../../_types';

import { CustomInstance, CheckboxFieldFormElement } from '.';


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

  const [value, setValue] = useState<boolean>(defaultValue === 'true' ? true : false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        checked={value}
        className={cn(error && 'border-red-500')}
        id={id}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;

          setValue(value);
          if (!submitValue) return;
          const stringValue = value ? 'true' : 'false';
          const valid = CheckboxFieldFormElement.validate(element, stringValue);
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label className={cn(error && 'text-red-500')} htmlFor={id}>
          {label}
          {required && '*'}
        </Label>
        {helperText && (
          <p className={cn('text-muted-foreground text-[0.8rem]', error && 'text-red-500')}>{helperText}</p>
        )}
      </div>
    </div>
  );
};

export default FormComponent;
