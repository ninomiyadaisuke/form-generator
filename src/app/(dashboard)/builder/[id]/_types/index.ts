export type ElementsType = 'TextField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type FormElement = React.ReactNode;

export type FormElementsType = {
  [key in ElementsType]: FormElement;
};
