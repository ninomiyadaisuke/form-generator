import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { useDesigner } from '../_hooks';

import { FormElements } from './FormElements';

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70"></p>
        <Button
          onClick={() => {
            setSelectedElement(null);
          }}
          size={'icon'}
          variant={'ghost'}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
