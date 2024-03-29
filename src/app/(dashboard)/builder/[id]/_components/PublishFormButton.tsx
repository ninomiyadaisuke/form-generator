'use client';

import { useRouter } from 'next/navigation';
import React, { FC, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { MdOutlinePublish } from 'react-icons/md';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { PublishForm } from '../_actions';


type Props = {
  id: number;
};

const PublishFormButton: FC<Props> = ({ id }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const publishForm = async () => {
    try {
      await PublishForm(id);

      toast({
        title: 'Success',
        description: 'Your form is now available to the public',
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white" variant="outline">
          <MdOutlinePublish className="size-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public and you will be able to collect
              submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormButton;
