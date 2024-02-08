import React from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';

import { Button } from '@/components/ui/button';

const OpenDialogButton = () => {
  return (
    <Button
      className="group flex h-[190px] flex-col items-center justify-center gap-4 border border-dashed border-primary/20 hover:cursor-pointer hover:border-primary"
      variant={'outline'}
    >
      <BsFileEarmarkPlus className="size-8 text-muted-foreground group-hover:text-primary" />
      <p className="text-xl font-bold text-muted-foreground group-hover:text-primary">Create new form</p>
    </Button>
  );
};

export default OpenDialogButton;
