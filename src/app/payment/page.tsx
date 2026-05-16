'use client';
import { Radio, Tooltip } from 'antd';
import React from 'react';
import Image from 'next/image';
import { InformationCircleIcon, TicketIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils';
import { SliderBanner } from '@/components/home';

export default function Page() {
  return (
    <div className='w-[75%] flex flex-row gap-5'>
      <div className='w-[75%] flex flex-col gap-5'>
        <div className='bg-white p-4 rounded-md'>
          <div className='font-semibold text-lg mb-4'>
            Chọn hình thức giao hàng
          </div>
          <div className='w-[50%] bg-sky-100 rounded-lg p-5 flex flex-col gap-5'>
            <Radio.Group className='flex flex-col gap-5' size={'small'}>
              <Radio value={1}>
                <span className=' mr-2'>Giao siêu tốc 2h</span>
                <span className='bg-white text-sm rounded-md text-green-500 p-1 font-medium'>
                  -25K
                </span>
              </Radio>

              <Radio value={2}>
                <span className=' mr-2'>Giao tiết kiệm</span>
                <span className='bg-white text-sm rounded-md text-green-500 p-1 font-medium'>
                  -25K
                </span>
              </Radio>
            </Radio.Group>
          </div>
        </div>

        <div className='bg-white p-4 rounded-md'>
          <span className='font-semibold text-lg mb-5'>
            Chọn hình thức thanh toán
          </span>

          <div className='w-[50%] mt-5 rounded-lg  flex flex-col gap-5'>
            <Radio.Group className='flex flex-col gap-5' size={'small'}>
              <Radio value={1} className='flex flex-row items-center gap-2'>
                <div className='flex-row flex gap-2 items-center'>
                  <Image src='cash.svg' width={30} height={30} alt='cash' />
                  <span className=' mr-2'>Thanh toán tiền mặt</span>
                </div>
              </Radio>

              <Radio value={2} className='flex flex-row items-center gap-2'>
                <div className='flex-row flex gap-2 items-center'>
                  <Image
                    src='viettelpay.svg'
                    width={30}
                    height={30}
                    alt='cash'
                  />
                  <span className=' mr-2'>Viettel Money</span>
                </div>
              </Radio>

              <Radio value={3} className='flex flex-row items-center gap-2'>
                <div className='flex-row flex gap-2 items-center'>
                  <Image src='momo.svg' width={30} height={30} alt='cash' />
                  <span className=' mr-2'>Ví Momo</span>
                </div>
              </Radio>

              <Radio value={4} className='flex flex-row items-center gap-2'>
                <div className='flex-row flex gap-2 items-center'>
                  <Image src='zalopay.svg' width={30} height={30} alt='cash' />
                  <span className=' mr-2'>Ví ZaloPay</span>
                </div>
              </Radio>

              <Radio value={5} className='flex flex-row items-center gap-2'>
                <div className='flex-row flex gap-2 items-center'>
                  <Image src='vnpay.svg' width={30} height={30} alt='cash' />
                  <span className=' mr-2'>VNPAY</span>
                </div>
              </Radio>

              <Radio value={6} className='flex flex-row items-center gap-2'>
                <div className='flex-row flex gap-2 items-center'>
                  <Image src='atm.svg' width={30} height={30} alt='cash' />
                  <span className=' mr-2'>Thẻ tín dụng / Ghi nợ</span>
                </div>
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className='w-[25%] flex flex-col gap-3'>
        <div className='bg-white p-4 rounded-md'>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Giao tới</span>
            <span className='text-blue-500 text-sm'>Thay đổi</span>
          </div>
          <span className='text-sm font-semibold'>
            Nguyễn Phúc Thịnh
            <span className='text-gray-200 inline-block px-1'>|</span>{' '}
            0896359374
          </span>
          <div>
            <span className='bg-gray-50 p-1 rounded-sm text-xs font-semibold text-green-500 mr-2'>
              Nhà
            </span>
            <span className='text-gray-500 text-sm'>
              13 Đường số 14, Phường An Lạc A, Quận Bình Tân, Hồ Chí Minh
            </span>
          </div>
        </div>
        <div className='bg-white p-4 rounded-md'>
          <div className='flex flex-row justify-between items-center'>
            <span className='text-xs font-medium'>Tiki Khuyến Mãi </span>
            <div className='text-gray-500 flex flex-row items-center gap-1'>
              <span className='text-sm'>Có thể chọn 2</span>
              <Tooltip
                placement='bottom'
                title={
                  'Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển'
                }
              >
                <InformationCircleIcon className='size-4 cursor-pointer' />
              </Tooltip>
            </div>
          </div>

          <div className='relative'>
            <Image
              src='/coupon.svg'
              unoptimized
              className='mt-3 relative'
              width={286}
              height={60}
              alt='coupon'
            />
            <div className='absolute top-1/2 -translate-y-1/2 flex flex-row items-center'>
              <Image
                src='/tiki.png'
                unoptimized
                className='ml-1.5 rounded-lg'
                width={44}
                height={44}
                alt='coupon'
              />
              <div className='text-xs font-medium ml-4 '>Giảm 3%</div>
              <div className='rounded-md text-white bg-blue-500 text-xs p-1 ml-16 px-4'>
                Bỏ Chọn
              </div>
            </div>
          </div>
          <div>
            <div className='text-blue-500 mt-5 flex flex-row items-center gap-2'>
              <TicketIcon className='size-5 font-semibold' />
              <span className='text-xs'>Chọn hoặc nhập khuyến mãi khác</span>
            </div>
          </div>
        </div>
        <div className='bg-white  rounded-md'>
          <div className='p-4'>
            <div className='flex justify-between'>
              <span className='text-gray-900 font-medium'>Đơn hàng</span>
              <span className='text-blue-500 text-sm'>Thay đổi</span>
            </div>
          </div>
          <hr className='mt-3' />
          <div className='p-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row justify-between items-center'>
                <span className='text-gray-500 text-sm'>Tạm tính</span>
                <span className='text-gray-900 text-sm'>
                  {formatCurrency('vi-VN', 'VND', 1156000)}₫
                </span>
              </div>

              <div className='flex flex-row justify-between items-center'>
                <span className='text-gray-500 text-sm'>Phí vận chuyển</span>
                <span className='text-gray-900 text-sm'>
                  {formatCurrency('vi-VN', 'VND', 56000)}₫
                </span>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <span className='text-gray-500 text-sm'>
                  Khuyến mãi vận chuyển
                </span>
                <span className='text-green-500 text-sm'>
                  -{formatCurrency('vi-VN', 'VND', 25000)}₫
                </span>
              </div>
              <hr className='mt-2' />

              <div className='flex flex-row justify-between items-center'>
                <span className='text-gray-500 text-sm'>Tổng tiền</span>
                <span className='text-red-500 text-xl font-medium'>
                  -{formatCurrency('vi-VN', 'VND', 1187000)}₫
                </span>
              </div>
              <div className='flex items-center justify-center text-white bg-red-500 p-2 rounded-md'>
                Đặt hàng
              </div>
            </div>
          </div>
        </div>

        <SliderBanner className='h-fit mt-5'>
          <div className='w-full h-32 flex flex-row shrink-0 gap-3'>
            <div className='w-full h-32 relative'>
              <Image
                className='rounded-lg'
                src='/banner-d-1.png'
                fill
                unoptimized
                alt=''
              />
            </div>
          </div>

          <div className='w-full h-32 flex flex-row shrink-0 gap-3'>
            <div className='w-full h-32 relative'>
              <Image
                className='rounded-lg'
                src='/banner-d-2.png'
                fill
                unoptimized
                alt=''
              />
            </div>
          </div>

          <div className='w-full h-32 flex flex-row shrink-0 gap-3'>
            <div className='w-full h-32 relative'>
              <Image
                className='rounded-lg'
                src='/banner-d-1.png'
                fill
                unoptimized
                alt=''
              />
            </div>
          </div>
        </SliderBanner>
      </div>
    </div>
  );
}
