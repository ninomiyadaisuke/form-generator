import React from 'react';

import DesignerSidebar from './DesignerSidebar';

const Designer = () => {
  return (
    <div className="flex size-full">
      <div className="w-full p-4">
        <div
          className={
            'm-auto flex h-full max-w-[920px] flex-1 grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background'
          }
        >
          <p className="flex grow items-center text-3xl font-bold text-muted-foreground">Drop here</p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
