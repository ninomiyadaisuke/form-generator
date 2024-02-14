import React, { FC } from 'react';
import { MdOutlinePublish } from 'react-icons/md';

import { Button } from '@/components/ui/button';

const PublishFormButton: FC = () => {
  return (
    <Button className="gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white" variant="outline">
      <MdOutlinePublish className="size-4" />
      Publish
    </Button>
  );
};

export default PublishFormButton;
