import { formatCurrency } from '@/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Checkbox, InputNumber } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';

type PropsType = {
  product: any;
};
export const ItemCart = ({ product }: PropsType) => {
  const [amount, setAmount] = useState(1);
  const handleChangeAmount = (type: string) => {
    switch (type) {
      case '+':
        setAmount(amount + 1);
        break;
      case '-':
        if (amount === 1) return;
        setAmount(amount - 1);
        break;
      default:
        break;
    }
  };
  return (
    <div className='ml-2 flex mb-5'>
      <div className='flex w-[45%] w-max-[45%] flex-row items-center'>
        <Checkbox />
        <Image
          className='w-[80px] h-[80px] mx-3'
          src={product.image}
          alt='product'
          width={80}
          height={80}
          unoptimized
        />

        <div className='w-[51%]'>
          <div className='flex flex-row items-center gap-1'>
            <Image
              src='/chinh-hang.png'
              alt='chinh-hang'
              width={89}
              height={20}
              unoptimized
            />

            <Image
              src='/doi-y.png'
              alt='doi-y'
              width={89}
              height={20}
              unoptimized
            />
          </div>
          <span className='text-sm'>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </span>
          <div className='flex flex-row items-center gap-1'>
            <Image
              src='/now.png'
              alt='now'
              width={32}
              height={16}
              unoptimized
            />
            <span className='text-xs'>Giao siêu tốc 2h</span>
          </div>
        </div>
      </div>
      <span className='w-[15%] w-max-[15%]  font-semibold flex items-center'>
        {formatCurrency('vi-VN', 'VND', product.price)}
        <sup>₫</sup>
      </span>
      <div className='w-[15%] w-max-[15%] flex items-center'>
        <InputNumber
          className='w-[55%] flex justify-center items-center text-center'
          defaultValue={amount}
          value={amount}
          controls={false}
          keyboard={false}
          variant='filled'
          addonAfter={
            <div
              className='cursor-pointer'
              onClick={() => {
                handleChangeAmount('+');
              }}
            >
              +
            </div>
          }
          addonBefore={
            <div
              className='cursor-pointer'
              onClick={() => {
                handleChangeAmount('-');
              }}
            >
              -
            </div>
          }
        />
      </div>

      <span className='font-semibold text-red-500 w-[15%] w-max-[15%] flex items-center'>
        {formatCurrency('vi-VN', 'VND', product.price * amount)}
        <sup>₫</sup>
      </span>
      <div className='text-gray-500 w-[10%] pr-5 flex justify-end items-center'>
        <TrashIcon className='size-5' />
      </div>
    </div>
  );
};
