'use client';

import { MdTextFields } from 'react-icons/md';

import { ElementsType, FormElement } from '../../../_types';

const type: ElementsType = 'TextField';

const extraAttributes = {
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
  designerComponent: () => <div>designerComponent</div>,
  formComponent: () => <div>formComponent</div>,
  propertiesComponent: () => <div>propertiesComponent</div>,
};
