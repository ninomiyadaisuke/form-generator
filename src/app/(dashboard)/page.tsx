import { Suspense } from 'react';

import { getFormStats } from './_actions';
import OpenDialogButton from './_components/OpenDialogButton';
import StatsCardList from './_components/StatsCardList';

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCardList loading={true} />}>
        <Wrapper />
      </Suspense>
      <OpenDialogButton />
    </div>
  );
}

async function Wrapper() {
  const stats = await getFormStats();
  return <StatsCardList loading={false} stats={stats} />;
}
