'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Input } from './Input';
import {
  MagnifyingGlassIcon,
  HomeIcon,
  ShoppingCartIcon,
  CheckBadgeIcon,
  CubeIcon,
  TruckIcon,
  TagIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/20/solid';
import { MapPinIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Modal } from 'antd';

export const Header = () => {
  const router = useRouter();
  const refSearch = useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeSearch = (e: any) => {
    console.log(refSearch);

    if (refSearch.current) refSearch.current.value = e.target.value;
  };

  const handleSearch = () => {
    console.log(refSearch.current.value);
    router.push(`/search?query=${refSearch.current.value}`);
  };
  return (
    <div className='bg-white border-b border-gray-200'>
      <nav className='flex flex-row items-center h-fit gap-1 justify-center pt-3 border-b pb-2.5'>
        <Link
          href='/'
          className='w-fit flex items-center justify-center flex-col mr-10'
        >
          <Image
            src='/logo.png'
            alt='Tiki'
            width={96}
            height={40}
            className=''
            unoptimized
          />
          <span className='text-[#053B8E] font-semibold text-sm mt-1'>
            Tốt & Nhanh
          </span>
        </Link>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <Input
              ref={refSearch}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
              button={
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Tìm kiếm
                </button>
              }
              className='w-[58rem]'
              icon={<MagnifyingGlassIcon className='size-5 text-gray-500' />}
              placeholder='Bạn tìm kiếm gì hôm nay?'
            />

            <div className='flex flex-row gap-2 self-start ml-20'>
              <Link
                href='/'
                className='flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] font-medium w-fit p-2 rounded text-sm items-center justify-center'
              >
                <HomeIcon className='size-6 text-[#0560D9]' />
                <span className='text-blue-500'>Trang chủ</span>
              </Link>
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className='relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33]  w-fit p-2 rounded text-sm items-center justify-center '
              >
                <FaceSmileIcon className='size-6 text-gray-500' />
                <span className='text-gray-500'>Tài khoản</span>
              </div>
              <Link
                href='/cart'
                className='ml-10 relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] w-fit p-2 rounded text-sm items-center justify-center before:w-[1px] before:h-3/6 before:absolute before:bg-[#BFC4CC] before:-left-5'
              >
                <ShoppingCartIcon className='size-6 text-[#0560D9]' />
              </Link>
            </div>
          </div>

          <div className='flex flex-row justify-between mt-2.5'>
            <div className='flex gap-3'>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                Điện gia dụng
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                xe cộ
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                khỏe đẹp
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                nhà cửa
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                sách
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                thể thao
              </a>
            </div>
            <div className='text-sm flex '>
              <MapPinIcon className='size-5 text-gray-500' />
              <span className='text-gray-500 mr-1'>Giao đến:</span>
              <span className='color-black underline'>
                Q. Bình Tân, P. An Lạc A, Tp. Hồ Chí Minh
              </span>
            </div>
          </div>
          <div></div>
        </div>
      </nav>
      <div className='flex flex-row gap-5 mt-2.5 items-center justify-start ml-56 mb-2.5'>
        <span className='font-semibold text-sm text-[#033A8C]'>Cam kết</span>
        <div className='flex flex-row gap-1  items-center cursor-pointer'>
          <CheckBadgeIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>100% hàng thật</span>
        </div>
        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <CurrencyDollarIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Hoàn 200% nếu hàng giả</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <CubeIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>30 ngày đổi trả</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <TruckIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Giao nhanh 2h</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <TagIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Giá siêu rẻ</span>
        </div>
        <Modal
          closable={false}
          title={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className=''
          width={950}
        >
          <div className='w-full flex flex-row relative '>
            <div
              onClick={() => {
                setIsModalOpen(false);
              }}
              className='w-10 h-10 bg-white rounded-full flex justify-center absolute items-center -top-3 -right-3 cursor-pointer font-bold'
            >
              X
            </div>

            <div className='p-16 flex flex-col mb-5 w-[70%]'>
              <div className='flex flex-col gap-5 mb-20'>
                <span className='text-3xl font-semibold'>Xin chào,</span>
                <span className='text-sm '>Đăng nhập hoặc Tạo tài khoản</span>
                <input
                  type='number'
                  className='outline-none border-b border-blue-500 py-2 text-2xl w-full'
                  placeholder='Số điện thoại'
                />
                <div className=' cursor-pointer bg-red-500 p-2 text-white rounded-md flex items-center justify-center text-xl'>
                  Tiếp Tục
                </div>
                <span className='text-blue-500 cursor-pointer justify-self-center self-center'>
                  Đăng nhập bằng email
                </span>
              </div>
              <div className='self-center w-full flex flex-col gap-3'>
                <div className='flex flex-row gap-2 w-full items-center justify-center'>
                  <div className='h-[1px] bg-gray-100 w-[20%]'></div>
                  <div className='text-gray-500'>Hoặc tiếp tục bằng</div>
                  <div className='h-[1px] bg-gray-100 w-[20%]'></div>
                </div>
                <div className='flex flex-row gap-3 justify-center'>
                  <Image
                    alt='gg'
                    src='/gg.png'
                    width={60}
                    height={60}
                    unoptimized
                  />
                  <Image
                    alt='fb'
                    src='/fb.png'
                    width={60}
                    height={60}
                    unoptimized
                  />
                </div>
                <span className='w-[85%] mt-5 text-xs text-gray-500'>
                  Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử
                  dụng và Chính sách bảo mật thông tin cá nhân của Tiki
                </span>
              </div>
            </div>
            <div className='bg-sky-100 w-[30%] rounded-lg'>
              <div className='flex flex-col justify-center items-center h-full'>
                <Image
                  className='h-fit mb-7 '
                  src='/login.png'
                  width={200}
                  height={100}
                  alt='login'
                  unoptimized
                />
                <div className='text-blue-600 flex flex-col gap-2 justify-center items-center'>
                  <span className='text-lg font-semibold'>
                    Mua sắm tại Tiki
                  </span>
                  <span className='text-sm font-medium'>
                    Siêu ưu đãi mỗi ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
