import { getHMS } from '@/utils';
import React, { useEffect, useRef } from 'react';

type PropsType = {
  seconds: number;
};
export const Countdown = ({ seconds }: PropsType) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [_seconds, setSeconds] = React.useState(seconds);
  const [HMS, setHMS] = React.useState(getHMS(seconds));

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const { h, m, s } = getHMS(_seconds - 1);

      setHMS({ h, m, s });
      setSeconds((_seconds) => _seconds - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  });

  return (
    <div className='flex flex-row gap-1'>
      <div className='text-white bg-red-500 rounded-md text-sm p-1 px-2 max-w-12 w-7 flex items-center justify-center'>
        {HMS.h < 10 ? `0${HMS.h}` : HMS.h}
      </div>
      :
      <div className='text-white bg-red-500 rounded-md text-sm p-1 px-2 max-w-12 w-7 flex items-center justify-center'>
        {HMS.m < 10 ? `0${HMS.m}` : HMS.m}
      </div>
      :
      <div className='text-white bg-red-500 rounded-md text-sm p-1 px-2 max-w-12 w-7 flex items-center justify-center'>
        {HMS.s < 10 ? `0${HMS.s}` : HMS.s}
      </div>
    </div>
  );
};
