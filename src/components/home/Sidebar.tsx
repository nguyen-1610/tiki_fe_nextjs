import React from 'react';
import Image from 'next/image';

export const Sidebar = () => {
  return (
    <div
      className='sticky top-3  min-w-56 flex flex-col   overflow-y-scroll max-h-screen '
      style={{
        scrollbarWidth: 'none',
      }}
    >
      <div className='pt-5 bg-white rounded-lg pl-3 pr-10'>
        <span className='font-semibold p-3.5 pl-4'>Danh mục</span>
        <div className='mt-3 flex flex-col justify-center items-center'>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/nha-sach-tiki.png'
              width={35}
              height={35}
              alt='nha-sach-tiki'
              unoptimized
            />
            <div className='text-sm max-w-36'>Nhà Sách Tiki</div>
          </a>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/nha-cua-va-doi-song.webp'
              width={35}
              height={35}
              alt='nha-cua-va-doi-song'
              unoptimized
            />
            <div className='text-sm max-w-36'>Nhà Cửa - Đời Sống</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/do-choi-me-va-be.webp'
              width={35}
              height={35}
              alt='do-choi-me-va-be'
              unoptimized
            />
            <div className='text-sm max-w-36'>Đồ Chơi - Mẹ & Bé</div>
          </a>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/dien-thoai-may-tinh-bang.webp'
              width={35}
              height={35}
              alt='dien-thoai-may-tinh-bang'
              unoptimized
            />
            <div className='text-sm max-w-36'>Điện Thoại - Máy Tính Bảng</div>
          </a>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/thiet-bi-so-phu-kien-so.webp'
              width={35}
              height={35}
              alt='thiet-bi-so-phu-kien-so'
              unoptimized
            />
            <div className='text-sm max-w-36'>Thiết Bị Số - Phụ Kiện Số</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/dien-gia-dung.webp'
              width={35}
              height={35}
              alt='diengiadung'
              unoptimized
            />
            <div className='text-sm max-w-36'>Điện Gia Dụng</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/lam-dep-suc-khoe.webp'
              width={35}
              height={35}
              alt='lam-dep-suc-khoe'
              unoptimized
            />
            <div className='text-sm max-w-36'>Làm Đẹp - Sức khỏe</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/oto-xe-may-xe-dap.webp'
              width={35}
              height={35}
              alt='oto-xe-may-xe-dap'
              unoptimized
            />
            <div className='text-sm max-w-36'>Ô Tô - Xe Máy - Xe Đạp</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/thoi-trang-nu.webp'
              width={35}
              height={35}
              alt='thoi-trang-nu'
              unoptimized
            />
            <div className='text-sm max-w-36'>Thời Trang Nữ</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/bach-hoa-online.webp'
              width={35}
              height={35}
              alt='bach-hoa-online'
              unoptimized
            />
            <div className='text-sm max-w-36'>Bách Hóa Online</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/the-thao-da-ngoai.webp'
              width={35}
              height={35}
              alt='the-thao-da-ngoai'
              unoptimized
            />
            <div className='text-sm max-w-36'>Thể Thao - Dã Ngoại</div>
          </a>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/thoi-trang-nam.webp'
              width={35}
              height={35}
              alt='thoi-trang-nam'
              unoptimized
            />
            <div className='text-sm max-w-36'>Thời Trang Nam</div>
          </a>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5 mb-2.5 hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/cross-border-hang-quoc-te.webp'
              width={35}
              height={35}
              alt='cross-border-hang-quoc-te'
              unoptimized
            />
            <div className='text-sm max-w-36'>Cross Border - Hàng Quốc Tế</div>
          </a>
        </div>
      </div>
      <div className='mt-3 pt-5 bg-white rounded-lg'>
        <span className='font-semibold p-3.5 pl-4'>Tiện ích</span>
        <div className='mt-3 flex flex-col justify-center items-center'>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/uu-dai-the-vi.webp'
              width={35}
              height={35}
              alt='uu-dai-the-vi'
              unoptimized
            />
            <div className='text-sm max-w-36'>Ưu đãi thẻ, ví</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5  hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/dong-tien-nap-the.webp'
              width={35}
              height={35}
              alt='dong-tien-nap-the'
              unoptimized
            />
            <div className='text-sm max-w-36'>Đóng tiền nạp thẻ</div>
          </a>

          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5 mb-2.5 hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/mua-truoc-tra-sau.webp'
              width={35}
              height={35}
              alt='mua-truoc-tra-sau'
              unoptimized
            />
            <div className='text-sm'>Mua trước trả sau</div>
          </a>
        </div>
      </div>

      <div className='mt-3 bg-white rounded-lg mb-2.5'>
        <div className='mt-3 flex flex-col justify-center items-center'>
          <a className='flex flex-row items-center justify-start gap-3 pl-2 pt-2.5 pb-2.5 mb-2.5 hover:bg-gray-200 w-[95%] rounded-md'>
            <Image
              src='/ban-hang-cung-tiki.webp'
              width={35}
              height={35}
              alt='ban-hang-cung-tiki'
              unoptimized
            />
            <div className='text-sm'>Bán hàng cùng Tiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
