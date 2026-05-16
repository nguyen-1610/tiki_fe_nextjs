'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type PropsType = {
  children: React.ReactNode[];
  className?: string;
};

export const SliderBanner = ({ children, className }: PropsType) => {
  const refContainer = React.useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [current, setCurrent] = useState(1);
  const [translate, setTranslate] = useState(0);
  const handleAction = useCallback(
    (action: 'next' | 'prev') => {
      if (refContainer.current) {
        refContainer.current.style.transitionDuration = '400ms';

        switch (action) {
          case 'prev': {
            if (current <= 1) {
              setTranslate(0);
              setCurrent(children.length);
              return;
            } else {
              setTranslate(
                (refContainer.current?.clientWidth || 0) * (current - 1) || 0,
              );
              setCurrent((prev) => --prev);
            }
            break;
          }

          case 'next': {
            if (current >= children.length) {
              setTranslate(
                (refContainer.current?.clientWidth || 0) *
                  (children.length + 1) || 0,
              );
              setCurrent(1);
              return;
            }
            setTranslate(
              (refContainer.current?.clientWidth || 0) * (current + 1) || 0,
            );
            setCurrent((prev) => ++prev);
            break;
          }
        }
      }
    },
    [current, children],
  );

  useEffect(() => {
    const transitionEnd = () => {
      const count = React.Children.count(children);

      if (count > 0 && refContainer.current) {
        if (current <= 1) {
          if (refContainer.current) {
            refContainer.current.style.transitionDuration = '0ms';
            setTranslate(refContainer.current.clientWidth * current);
          }
        }
        if (current >= children.length) {
          refContainer.current.style.transitionDuration = '0ms';

          setTranslate(refContainer.current.clientWidth * children.length);
        }
      }
    };
    document.addEventListener('transitionend', transitionEnd);
    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current, children]);
  useLayoutEffect(() => {
    if (!refContainer.current) return;
    setTranslate(refContainer.current?.clientWidth * 1);
  }, []);
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleAction('next');
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [handleAction]);
  return (
    <div
      className={`bg-white w-2/3 group rounded-xl mb-3 relative h-80 p-3 pb-5 ${className}`}
    >
      {React.Children.count(children) > 1 && (
        <div
          className='absolute left-5 invisible group-hover:visible cursor-pointer bg-white z-50 shadow shadow-gray-300 w-8 h-8 rounded-full  top-1/2 -translate-y-1/2 flex items-center justify-center'
          onClick={() => handleAction('prev')}
        >
          <ChevronLeftIcon className='size-7 text-blue-500' />
        </div>
      )}
      <div className='h-full overflow-x-hidden'>
        <div
          className='h-full flex flex-row'
          ref={refContainer}
          style={{
            transform: `translateX(-${translate}px)`,
          }}
        >
          {children[children.length - 1]}
          {children}
          {children[0]}
        </div>
      </div>
      <div className='flex flex-row justify-center mt-2 gap-3'>
        {children.length > 1 &&
          React.Children.map(children, (child, index) => {
            if (index === current - 1)
              return <div className='w-6 h-[1px] border border-blue-500'></div>;
            return <div className='w-4 h-[1px] border border-gray-500'></div>;
          })}
      </div>
      {children.length > 1 && (
        <div
          className='absolute right-5 invisible group-hover:visible cursor-pointer bg-white shadow shadow-gray-300 w-8 h-8 rounded-full  top-1/2 -translate-y-1/2 flex items-center justify-center'
          onClick={() => handleAction('next')}
        >
          <ChevronRightIcon className='size-7 text-blue-500' />
        </div>
      )}
    </div>
  );
};
