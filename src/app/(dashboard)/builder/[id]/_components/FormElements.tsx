import { FormElementsType } from '../_types';

import { CheckboxFieldFormElement } from './fields/CheckboxField';
import { TextFieldFormElement } from './fields/TextField';

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
