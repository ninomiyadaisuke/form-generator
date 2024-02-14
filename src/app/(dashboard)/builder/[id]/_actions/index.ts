'use server';

import { currentUser } from '@clerk/nextjs';

import prisma from '@/lib/prisma';

class UserNotFoundErr extends Error {}

export const getFormById = async (id: number) => {
  const user = await currentUser();
  if (!user) throw new UserNotFoundErr();

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
};
