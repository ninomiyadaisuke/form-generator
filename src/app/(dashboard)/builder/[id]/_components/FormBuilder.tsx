'use client';

import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Form } from '@prisma/client';
import React, { FC } from 'react';

import Designer from './Designer';
import DragOverlayWrapper from './DragOverlayWrapper';
import PreviewDialogButton from './PreviewDialogButton';
import PublishFormButton from './PublishFormButton';
import SaveFormBtn from './SaveFormBtn';

type Props = {
  form: Form;
};

const FormBuilder: FC<Props> = ({ form }) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
          <h1 className="w-full flex-col truncate">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h1>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormBtn /> <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="relative flex h-[200px] w-full grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
