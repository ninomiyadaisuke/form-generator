import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

function Loading() {
  return (
    <div className="flex size-full items-center justify-center">
      <ImSpinner2 className="size-12 animate-spin" />
    </div>
  );
}

export default Loading;
