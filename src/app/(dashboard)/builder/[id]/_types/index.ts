export type ElementsType = 'TextField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

export type FormElementsType = {
  [key in ElementsType]: FormElement;
};
