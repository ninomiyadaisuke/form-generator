import { Suspense } from 'react';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { getFormStats } from './_actions';
import FormCardList from './_components/FormCardList';
import OpenDialogCreateForm from './_components/OpenDialogCreateForm';
import StatsCardList from './_components/StatsCardList';

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCardList loading={true} />}>
        <Wrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="col-span-2 text-4xl font-bold">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <OpenDialogCreateForm />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <Skeleton className="border-primary-/20 h-[190px] w-full border-2" key={el} />
          ))}
        >
          <FormCardList />
        </Suspense>
      </div>
    </div>
  );
}

async function Wrapper() {
  const stats = await getFormStats();
  return <StatsCardList loading={false} stats={stats} />;
}
