import React from 'react';
import { MdPreview } from 'react-icons/md';

import { Button } from '@/components/ui/button';

const PreviewDialogButton = () => {
  return (
    <Button className="gap-2" variant="outline">
      <MdPreview className="size-6" /> Preview
    </Button>
  );
};

export default PreviewDialogButton;
