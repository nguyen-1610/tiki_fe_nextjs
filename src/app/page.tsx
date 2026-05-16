'use client';
import { SliderBanner } from '@/components/home';
import { Tabs, ListProduct } from '@/components/shared';
import Image from 'next/image';
import products from '@/data/products.json';
import brands from '@/data/brands.json';
import { Countdown } from '@/components/shared/Countdown';
import { ListBrand } from '@/components/home/ListBrand';
import { useEffect, useRef, useState } from 'react';
import { CardProduct } from '@/components/shared/CardProduct';


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: '0px', // no margin
        threshold: 0.5, // 50% of target visible
      },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Clean up the observer
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  });
  return (
    <>
      <SliderBanner >
        <div className='w-full h-full flex flex-row shrink-0 gap-3'>`
          <div className='w-1/2 h-full relative'>
            <Image
              className='rounded-lg'
              src='/banner-1-1.webp'
              fill
              unoptimized
              alt=''
            />
          </div>
          <div className='w-1/2 h-full relative'>
            <Image
              className='rounded-lg'
              src='/banner-1-2.webp'
              fill
              unoptimized
              alt=''
            />
          </div>
        </div>

        <div className='w-full h-full flex flex-row shrink-0 gap-3'>
          <div className='w-1/2 h-full relative'>
            <Image
              className='rounded-lg'
              src='/banner-2-1.webp'
              fill
              unoptimized
              alt=''
            />
          </div>
          <div className='w-1/2 h-full relative'>
            <Image
              className='rounded-lg'
              src='/banner-2-2.webp'
              fill
              unoptimized
              alt=''
            />
          </div>
        </div>

        <div className='w-full h-full flex flex-row shrink-0 gap-3'>
          <div className='w-1/2 h-full relative'>
            <Image
              className='rounded-lg'
              src='/banner-3-1.webp'
              fill
              unoptimized
              alt=''
            />
          </div>
          <div className='w-1/2 h-full relative'>
            <Image
              className='rounded-lg'
              src='/banner-3-2.webp'
              fill
              unoptimized
              alt=''
            />
          </div>
        </div>
      </SliderBanner>
      <div className='bg-white h-32 rounded-lg flex flex-row gap-5 justify-center pt-4 mb-3'>
        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/top-deal.png'
            width={44}
            height={44}
            unoptimized
            alt='top-deal'
          />
          <span className='text-[#D93843]'>TOP DEAL</span>
        </a>

        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/tiki-trading.png'
            width={44}
            height={44}
            unoptimized
            alt='tiki-trading'
          />
          <span>Tiki Trading</span>
        </a>

        <a className='flex flex-col items-center text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/coupon-sieu-hot.png'
            width={44}
            height={44}
            unoptimized
            alt='coupon-sieu-hot'
          />
          <span className='text-center'>Coupon siêu hot</span>
        </a>

        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/xa-kho-giam-nua-gia.png'
            width={44}
            unoptimized
            height={44}
            alt='xa-kho-giam-nua-gia'
          />
          <span className='text-center'>Xả kho giảm nửa giá</span>
        </a>

        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/hang-ngoai-gia-hot.png'
            width={44}
            height={44}
            unoptimized
            alt='hang-ngoai-gia-hot'
          />
          <span className='text-center'>Hàng ngoại giá hot</span>
        </a>

        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/cung-me-cham-be.webp'
            width={44}
            height={44}
            unoptimized
            alt='cuong-me-cham-be'
          />
          <span className='text-center'>Cùng mẹ chăm bé</span>
        </a>

        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/mot-sach-tiki.webp'
            width={44}
            height={44}
            unoptimized
            alt='mot-sach-tiki'
          />
          <span className='text-center'>Mọt sách Tiki</span>
        </a>
        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/the-gioi-cong-nghe.webp'
            width={44}
            height={44}
            unoptimized
            alt='the-gioi-cong-nghe'
          />
          <span className='text-center'>Thế giới công nghệ</span>
        </a>

        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/yeu-bep-nghien-nha.webp'
            width={44}
            height={44}
            unoptimized
            alt='yeu-bep-nghien-nha'
          />
          <span className='text-center'>Yêu bếp nghiện nhà</span>
        </a>

        <a className='flex flex-col items-center  text-sm font-medium gap-2 max-w-24'>
          <Image
            className='rounded-xl border border-gray-200'
            src='/khoe-dep-toan-dien.webp'
            width={44}
            height={44}
            unoptimized
            alt='khoe-dep-toan-dien'
          />
          <span className='text-center'>Khỏe đẹp toàn diện</span>
        </a>
      </div>
    
      <div className='relative rounded-lg mb-4 flex flex-col' ref={targetRef}>
        <div className='bg-white rounded-tl-xl rounded-tr-xl pr-1 pt-4 mb-2'>
          <span className='font-semibold text-md ml-3'>Gợi ý hôm nay</span>
          <div className='flex flex-row mt-5'>
            <div
              className={`w-36 h-16 hover:bg-gray-300 bg-blue-100 border-b border-blue-500 flex flex-col items-center justify-center cursor-pointer`}
            >
              <span className='text-blue-500 text-xs'>Dành cho bạn</span>
            </div>

            <div className='w-36 h-16 hover:bg-gray-300 flex flex-col items-center justify-center cursor-pointer'>
              <span className='text-gray-500 text-xs'>Top deal</span>
            </div>

            <div className='w-36 h-16 hover:bg-gray-300 flex flex-col items-center justify-center cursor-pointer'>
              <span className='text-gray-500 text-xs'>Sách Xả Kho - 60%</span>
            </div>

            <div className='w-36 h-16 hover:bg-gray-300 flex flex-col items-center justify-center cursor-pointer'>
              <span className='text-gray-500 text-xs'>Thể thao - 50%</span>
            </div>

            <div className='w-36 h-16 hover:bg-gray-300 flex flex-col items-center justify-center cursor-pointer'>
              <span className='text-gray-500 text-xs'>Gia dụng - 50%</span>
            </div>
          </div>
        </div>

        <div className='flex flex-row flex-wrap gap-2 mt-2'>
          {products.map((product: any) => {
            return <CardProduct data={product} key={product.id} />;
          })}
        </div>
        <div className='p-2 border mt-10 px-20 self-center rounded-md text-blue-500 border-blue-500'>
          Xem Thêm
        </div>
      </div>
    </>
  );
}
