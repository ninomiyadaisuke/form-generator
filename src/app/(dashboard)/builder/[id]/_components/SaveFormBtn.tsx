import React from 'react';
import { HiSaveAs } from 'react-icons/hi';

import { Button } from '@/components/ui/button';

const SaveFormBtn = () => {
  return (
    <Button className="gap-2" variant={'outline'}>
      <HiSaveAs className="size-4" /> Save
    </Button>
  );
};

export default SaveFormBtn;
