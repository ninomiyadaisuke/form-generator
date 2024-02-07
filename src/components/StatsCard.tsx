import React, { FC, ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
  helperText: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
  loading: boolean;
};

const StatsCard: FC<Props> = (props) => {
  const { title, value, icon, helperText, color, loading } = props;

  const cardColor = (() => {
    switch (color) {
      case 'blue':
        return 'shadow-blue-600';
      case 'green':
        return 'shadow-green-600';
      case 'yellow':
        return 'shadow-yellow-600';
      case 'red':
        return 'shadow-red-600';
    }
  })();
  return (
    <Card className={cn('shadow-md', cardColor)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="pt-1 text-xs text-muted-foreground">{helperText}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
