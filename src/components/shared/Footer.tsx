import React from 'react';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className='bg-white rounded-xs p-4 flex flex-row gap-12 mt-5 justify-center w-full '>
      <div className='flex flex-col w-64'>
        <span className='text-md font-medium mb-4 text-gray-900'>
          Hỗ trợ khách hàng
        </span>
        <div className='flex flex-col gap-2'>
          <span className='text-xs text-gray-500'>
            Hotline: <span className='font-medium'>1900-6035</span> (1000
            đ/phút, 8-21h kể cả T7, CN)
          </span>

          <span className='text-xs text-gray-500'>Các câu hỏi thường gặp</span>
          <span className='text-xs text-gray-500'>Hướng dẫn đặt hàng</span>
          <span className='text-xs text-gray-500'>Phương thức vận chuyển</span>
          <span className='text-xs text-gray-500'>Chính sách đổi trả</span>
          <span className='text-xs text-gray-500'>Hướng dẫn trả góp</span>
          <span className='text-xs text-gray-500'>
            Chính sách hàng nhập khẩu
          </span>
          <span className='text-xs text-gray-500'>
            Hỗ trợ khách hàng: hotro@tiki.vn
          </span>
          <span className='text-xs text-gray-500'>
            Báo lỗi bảo mật: security@tiki.vn
          </span>
        </div>
      </div>
      <div className='flex flex-col w-64'>
        <span className='text-md font-medium text-gray-900 mb-4'>Về Tiki</span>
        <div className='flex flex-col gap-2'>
          <span className='text-xs text-gray-500'>Giới thiệu Tiki</span>

          <span className='text-xs text-gray-500'>Tiki Blog</span>
          <span className='text-xs text-gray-500'>Tuyển dụng</span>
          <span className='text-xs text-gray-500'>
            Chính sách bảo mật thanh toán
          </span>
          <span className='text-xs text-gray-500'>
            Chính sách bảo mật thông tin cá nhân
          </span>
          <span className='text-xs text-gray-500'>
            Chính sách giải quyết khiếu nại
          </span>
          <span className='text-xs text-gray-500'>Điều khoản sử dụng</span>
          <span className='text-xs text-gray-500'>Giới thiệu Tiki Xu</span>
          <span className='text-xs text-gray-500'>
            Tiếp thị liên kết cùng Tiki
          </span>

          <span className='text-xs text-gray-500'>Bán hàng doanh nghiệp</span>
          <span className='text-xs text-gray-500'>Điều kiện vận chuyển</span>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='text-md font-medium text-gray-900 mb-4'>
          Hợp tác và liên kết
        </span>

        <span className='text-xs text-gray-500'>
          Quy chế hoạt động Sàn GDTMĐT
        </span>
        <span className='text-xs text-gray-500'>Bán hàng cùng Tiki</span>
        <span className='text-md font-medium text-gray-900 mt-4 mb-4'>
          Chứng nhận bởi
        </span>
        <div className='flex flex-row gap-2'>
          <Image
            src='/verify-1.png'
            width={32}
            height={32}
            alt='verify'
            unoptimized
          />

          <Image
            src='/verify-2.png'
            width={83}
            height={32}
            alt='verify'
            unoptimized
          />

          <Image
            src='/verify-3.png'
            width={32}
            height={32}
            alt='verify'
            unoptimized
          />
        </div>
      </div>

      <div className='flex flex-col gap-2 w-64'>
        <span className='text-md font-medium text-gray-900 mb-4'>
          Phương thức thanh toán
        </span>

        <div className='flex flex-row gap-2 flex-wrap'>
          <Image
            src='/tiki-payment.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />

          <Image
            src='/visa.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/mastercard.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/jcb.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/atm.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/momo.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/zalopay.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/viettelpay.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/vnpay.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />

          <Image
            src='/cash.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/tragop.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
        </div>
        <span className='text-md font-medium text-gray-900 mt-4'>
          Dịch vụ giao hàng
        </span>
        <Image
          className='ml-[-9px]'
          src='/ship.png'
          width={130}
          height={14}
          alt='ship'
          unoptimized
        />
      </div>

      <div className='flex flex-col gap-2 w-72'>
        <span className='text-md font-medium text-gray-900 mb-4'>
          Kết nối với chúng tôi
        </span>

        <div className='flex flex-row gap-2 flex-wrap'>
          <Image
            src='/facebook.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />

          <Image
            src='/youtube.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
          <Image
            src='/zalo.svg'
            width={35}
            height={35}
            alt='verify'
            unoptimized
          />
        </div>
        <div>
          <span className='text-md mb-4 block font-medium text-gray-900 mt-4'>
            Tải ứng dụng trên điện thoại
          </span>
          <div className='flex flex-row gap-1 w-fit'>
            <Image
              src='/qrcode.png'
              width={80}
              height={80}
              alt='ship'
              unoptimized
            />
            <div className='flex flex-col gap-1 w-fit'>
              <Image
                src='/appstore.png'
                width={130}
                height={40}
                alt='appstore'
              />
              <Image
                src='/playstore.png'
                width={130}
                height={40}
                alt='appstore'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
