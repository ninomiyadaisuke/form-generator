'use client';

import { MdTextFields } from 'react-icons/md';

import { ElementsType, FormElement, FormElementInstance } from '../../../_types';

import DesignerComponent from './DesignerComponent';

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
  formComponent: () => <div>formComponent</div>,
  propertiesComponent: () => <div>propertiesComponent</div>,
};
