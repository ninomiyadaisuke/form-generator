import { Suspense } from 'react';

import { Separator } from '@/components/ui/separator';

import { getFormStats } from './_actions';
import CreateForm from './_components/CreateForm';
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
      <CreateForm />
    </div>
  );
}

async function Wrapper() {
  const stats = await getFormStats();
  return <StatsCardList loading={false} stats={stats} />;
}
