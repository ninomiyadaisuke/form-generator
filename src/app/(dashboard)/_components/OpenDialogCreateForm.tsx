import React from 'react';

import CreateForm from './CreateForm';
import OpenDialogButton from './OpenDialogButton';
import OpenDialogWrapper from './OpenDialogWrapper';

const OpenDialogCreateForm = () => {
  return <OpenDialogWrapper button={<OpenDialogButton />} form={<CreateForm />} />;
};

export default OpenDialogCreateForm;
