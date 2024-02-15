import { useDraggable } from '@dnd-kit/core';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { FormElement } from '../_types';

type Props = {
  formElement: FormElement;
};

const SidebarButtonElement: FC<Props> = ({ formElement }) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });
  return (
    <Button
      className={cn(
        'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary',
      )}
      ref={draggable.setNodeRef}
      variant={'outline'}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className="size-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarButtonElement;

export function SidebarButtonElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button className="flex size-[120px] cursor-grab flex-col gap-2" variant={'outline'}>
      <Icon className="size-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
