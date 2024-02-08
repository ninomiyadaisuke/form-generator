import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';

import StatsCard from '@/components/StatsCard';
import StatsCardWrapper from '@/components/StatsCardWrapper';

import { StatsCardListType } from '../_actions';

import type { ComponentProps, FC } from 'react';

type StatsCartType = ComponentProps<typeof StatsCard>;

type StatsCardDataType = Omit<StatsCartType, 'loading' | 'value'> & { unit?: string };

const data = [
  {
    title: 'Total visits',
    icon: <LuView className="text-blue-600" />,
    helperText: 'All time form visits',
    color: 'blue',
  },
  {
    title: 'Total submissions',
    icon: <FaWpforms className="text-blue-600" />,
    helperText: 'All time form visits',
    color: 'yellow',
  },
  {
    title: 'Submission rate',
    icon: <HiCursorClick className="text-blue-600" />,
    helperText: 'All time form visits',
    color: 'green',
    unit: '%',
  },
  {
    title: 'Bounce rate',
    icon: <TbArrowBounce className="text-blue-600" />,
    helperText: 'All time form visits',
    color: 'red',
    unit: '%',
  },
] satisfies StatsCardDataType[];

const StatsCardList: FC<StatsCardListType> = (props) => {
  const { loading, stats } = props;

  const newData = data.map((d, i) => ({ ...d, value: stats ? stats[i] : undefined }));
  return (
    <StatsCardWrapper>
      {newData.map((d) => (
        <StatsCard
          color={d.color}
          helperText={d.helperText}
          icon={d.icon}
          key={d.title}
          loading={loading}
          title={d.title}
          value={`${d?.value?.toString()}${d?.unit || ''}`}
        />
      ))}
    </StatsCardWrapper>
  );
};

export default StatsCardList;
