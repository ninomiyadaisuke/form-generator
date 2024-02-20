'use client';

import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Form } from '@prisma/client';
import React, { FC, useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { useDesigner } from '../_hooks';
import { FormElementInstance } from '../_types';

import Designer from './Designer';
import DragOverlayWrapper from './DragOverlayWrapper';
import PreviewDialogButton from './PreviewDialogButton';
import PublishFormButton from './PublishFormButton';
import SaveFormBtn from './SaveFormBtn';


type Props = {
  form: Form;
};

const FormBuilder: FC<Props> = ({ form }) => {
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content) as FormElementInstance[];
    setElements(elements);

    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => clearTimeout(readyTimeout);
  }, [form, isReady, setElements]);

  const sensors = useSensors(mouseSensor, touchSensor);

  if (!isReady) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <ImSpinner2 className="size-12 animate-spin" />
      </div>
    );
  }

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
                <SaveFormBtn id={form.id} /> <PublishFormButton id={form.id} />
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
