import React, { AllHTMLAttributes } from 'react';
import Image from 'next/image';
import { Rate } from 'antd';
import { formatCurrency } from '@/utils';
import Link from 'next/link';

type PropsType = {
  data: {
    id: string;
    image: string;
    name: string;
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
  };
};

export const CardProduct = ({
  data,
  ...rest
}: PropsType & AllHTMLAttributes<HTMLDivElement>) => {
  const {
    id,
    image,
    title,
    price,
    star,
    isTopDeal,
    isAuthentic,
    sale,
    shipping,
    isGlobal,
    madeIn,
  } = data;
  return (
    <Link
      href={`/detail/${id}`}
      className={`w-[16%]  border bg-white border-gray-200 pb-1 rounded-md flex flex-col gap-1 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] cursor-pointer flex-shrink-0 ${rest.className}`}
    >
      <Image
        src={image}
        width={200}
        height={200}
        alt={title}
        unoptimized
        className='rounded-tl-md w-full rounded-tr-md'
      />
      <div className='flex flex-col gap-1'>
        <div className='flex flex-col gap-1 min-h-40'>
          <div className='flex flex-col gap-1 mt-0.5 ml-1.5 min-h-12'>
            {isTopDeal && (
              <Image
                src={'/top-deal-1.png'}
                width={80}
                height={20}
                alt={title}
                unoptimized
              />
            )}
            {isAuthentic && (
              <Image
                src={'/chinh-hang.png'}
                width={80}
                height={20}
                alt={title}
                unoptimized
              />
            )}
          </div>
          <div className='text-xs leading-4 ml-1.5 max-h-8 h-20 line-clamp-2'>
            {title}
          </div>
          <Rate
            className='block text-[10px] ml-1.5 [&>li]:!me-0.5 text-yellow-400'
            allowHalf
            disabled
            defaultValue={star}
          />
          <div className='ml-1.5'>
            {sale ? (
              <>
                <span className='text-[#ff424e] font-semibold'>
                  {formatCurrency(
                    'vi-VN',
                    'VND',
                    price - (price * sale.percent) / 100,
                  )}

                  <sup>₫</sup>
                </span>

                <div className=''>
                  <div className='bg-gray-200 inline text-xs font-medium px-1 rounded-full w-fit text-black'>
                    {sale.percent}%
                  </div>

                  <div className='line-through text-gray-500 inline text-[11px] ml-1'>
                    {formatCurrency('vi-VN', 'VND', price)}

                    <sup>₫</sup>
                  </div>
                </div>
              </>
            ) : (
              <span className='text-black font-semibold tracking-tight'>
                {formatCurrency('vi-VN', 'VND', price)}
                <sup>₫</sup>
              </span>
            )}
          </div>
        </div>
        <div className='mb-3.5 ml-2.5'>
          {madeIn && <div className=' text-[10px] h-0'>Made in {madeIn}</div>}
        </div>
        <hr className='block w-[90%] self-center' />

        {isGlobal && <span>Hàng quốc tế</span>}
        <div className='ml-0.5 text-[10px] text-gray-500 flex flex-row items-center justify-start gap-2 px-1 max-h-5'>
          {shipping.type === 'fast' ? (
            <>
              <Image
                src={'/now.png'}
                width={32}
                height={16}
                alt={'shipping'}
                unoptimized
              />
              <span>Giao siêu tốc {shipping.date}</span>
            </>
          ) : (
            <>
              <Image
                src={'/weather.png'}
                width={32}
                height={16}
                alt={'shipping'}
                unoptimized
              />
              <span className='text-[10px] text-gray-500'>
                Giao {shipping.date}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
