'use client';

import React from 'react';
import * as z from 'zod';

import OpenDialogButton from './OpenDialogButton';
import OpenDialogWrapper from './OpenDialogWrapper';


const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;

const CreateForm = () => {
  return <OpenDialogWrapper button={<OpenDialogButton />} form={<div>ここにフォームが入ります</div>} />;
};

export default CreateForm;
