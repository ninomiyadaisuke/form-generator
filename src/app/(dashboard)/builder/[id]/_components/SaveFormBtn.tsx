import React, { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { HiSaveAs } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { UpdateFormContent } from '../_actions';
import { useDesigner } from '../_hooks';

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const josonElements = JSON.stringify(elements);
      await UpdateFormContent(id, josonElements);
      toast({
        title: 'Success',
        description: 'Your form has been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };
  return (
    <Button className="gap-2" disabled={loading} onClick={() => startTransition(updateFormContent)} variant={'outline'}>
      <HiSaveAs className="size-4" /> Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
