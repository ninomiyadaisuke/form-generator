'use server';

import { currentUser } from '@clerk/nextjs';

import prisma from '@/lib/prisma';

import { FormSchemaType, formSchema } from '../_schemas';

class UserNotFoundErr extends Error {}

export const getFormStats = async () => {
  const user = await currentUser();
  if (!user) throw new UserNotFoundErr();

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return [visits, submissions, submissionRate, bounceRate];
};

export type StatsCardListType = {
  stats?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
};

export const createForm = async (data: FormSchemaType) => {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('form not valid');
  }
  const user = await currentUser();
  if (!user) throw new UserNotFoundErr();

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });
  if (!form) {
    throw new Error('something went wrong');
  }

  return form.id;
};
