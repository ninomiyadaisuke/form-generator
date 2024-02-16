'use client';

import { MdTextFields } from 'react-icons/md';

import { ElementsType, FormElement, FormElementInstance } from '../../../_types';

import DesignerComponent from './DesignerComponent';
import FormComponent from './FormComponent';
import PropertiesComponent from './PropertiesComponent';

const type: ElementsType = 'TextField';

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeHolder: 'Value here...',
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: MdTextFields,
    label: 'Text field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};
