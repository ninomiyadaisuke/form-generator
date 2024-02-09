'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

import { createForm } from '../_actions';
import { FormSchemaType, formSchema } from '../_schemas';


const CreateForm = () => {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const formId = await createForm(values);
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4 w-full" disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting && <span>Save</span>}
          {form.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
