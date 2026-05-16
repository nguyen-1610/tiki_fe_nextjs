'use client';
import React, { useState } from 'react';
import { CardProduct } from './CardProduct';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type PropsType = {
  cardStyle?: string;
  data: {
    image: string;
    title: string;
    price: number;
    star?: number;
    isTopDeal?: boolean;
    isAuthentic?: boolean;
    sale?: {
      percent: number;
    };
    shipping: {
      type: 'fast' | 'normal' | string;
      date: string;
    };
    isGlobal?: boolean;
    madeIn?: string;
  }[];
};
export const ListProduct = ({ data, cardStyle }: PropsType) => {
  const refContainer = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState(1);

  const [translate, setTranslate] = useState(0);
  const handleAction = (action: 'next' | 'prev') => {
    if (refContainer.current) {
      refContainer.current.style.transitionDuration = '400ms';
      const length = Math.ceil(data.length / 6);

      switch (action) {
        case 'prev': {
          if (current === 1) {
            setTranslate(0);
            setCurrent(1);
            return;
          }
          setTranslate(
            (refContainer.current?.clientWidth || 0) * (current - 2) || 0,
          );
          setCurrent((prev) => --prev);
          break;
        }

        case 'next': {
          if (current >= length) {
            setTranslate(
              (refContainer.current?.clientWidth || 0) * length || 0,
            );
            setCurrent(1);
            return;
          }
          setTranslate((refContainer.current?.clientWidth || 0) * current || 0);
          setCurrent((prev) => ++prev);
          break;
        }
      }
    }
  };
  return (
    <div className='relative group'>
      {current !== 1 && (
        <div
          className='absolute left-5 invisible group-hover:visible cursor-pointer bg-white z-50 shadow shadow-gray-300 w-8 h-8 rounded-full  top-1/2 -translate-y-1/2 flex items-center justify-center'
          onClick={() => handleAction('prev')}
        >
          <ChevronLeftIcon className='size-7 text-blue-500' />
        </div>
      )}
      <div
        ref={refContainer}
        className='flex gap-[0.677%] w-full flex-shrink-0 relative group'
        style={{
          transform: `translateX(-${translate}px)`,
          transitionDuration: '400ms',
        }}
      >
        {data.map((product: any) => (
          <CardProduct data={product} key={product.id} className={cardStyle} />
        ))}
      </div>

      {Math.ceil(data.length / 6) !== 1 &&
        current !== Math.ceil(data.length / 6) && (
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
