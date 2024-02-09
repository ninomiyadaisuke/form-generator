import { Suspense } from 'react';

import { Separator } from '@/components/ui/separator';

import { getFormStats } from './_actions';
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
      <OpenDialogCreateForm />
    </div>
  );
}

async function Wrapper() {
  const stats = await getFormStats();
  return <StatsCardList loading={false} stats={stats} />;
}
