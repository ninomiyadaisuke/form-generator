import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const StatsCardWrapper: FC<Props> = ({ children }) => {
  return <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">{children}</div>;
};

export default StatsCardWrapper;
