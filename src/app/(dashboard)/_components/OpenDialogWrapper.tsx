'use client';
import React, { FC, ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  button: ReactNode;
  form: ReactNode;
};

const OpenDialogWrapper: FC<Props> = (props) => {
  const { button, form } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>Create a new form to start collecting responses</DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};

export default OpenDialogWrapper;
