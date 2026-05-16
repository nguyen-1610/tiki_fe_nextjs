import { Dot } from '@/components/shared/Dot';
import { Timeline } from 'antd';
import Image from 'next/image';

export default function Page() {
  return (
    <div className=' w-[75%]'>
      <div className='text-lg font-semibold mb-4'>Đơn hàng</div>
      <div className='flex flex-row gap-4 w-full'>
        <div className='bg-white p-4 flex-col w-[70%] rounded-lg'>
          <div className='text-green-500 text-lg font-medium'>
            Giao vào Thứ 7, 30/10
          </div>
          <div className='text-xs text-gray-500'>
            Được giao bởi GUMAC Official Store
          </div>
          <hr className='my-3' />
          <Timeline
            className='mt-10 w-[60%]'
            mode='left'
            items={[
              {
                label: <span className=''>09:51</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,
                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg text-green-500 font-semibold'>
                      Đang giao hàng
                    </div>
                    <span className='text-sm text-gray-500'>
                      09:51, Thứ hai 01/11/2024
                    </span>

                    <div className=''>Nhân viên đang giao hàng</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
              {
                label: <span className=''>09:51</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,
                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời kho phân loại
                    </div>
                    <span className='text-sm text-gray-500'>
                      09:51, Thứ hai 01/11/2024
                    </span>

                    <div>Đã tới kho Bình Tân</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
              {
                label: <span className=''>09:51</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời kho phân loại
                    </div>
                    <span className='text-sm text-gray-500'>
                      09:51, Thứ hai 01/11/2024
                    </span>
                    <div>Đã rời kho Tân tạo</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>09:51</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời bưu cục
                    </div>
                    <span className='text-sm text-gray-500'>
                      09:51, Thứ hai 01/11/2024
                    </span>
                    <div>Đã rời bưu cục</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>09:51</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đang được chuẩn bị
                    </div>
                    <span className='text-sm text-gray-500'>
                      09:51, Thứ hai 01/11/2024
                    </span>
                    <div>Người gửi đang chuẩn bị hàng</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>09:51</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đặt hàng thành công
                    </div>
                    <span className='text-sm text-gray-500'>
                      09:51, Thứ hai 01/11/2024
                    </span>
                    <div>Đơn hàng đã được đặt</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className='w-[30%] bg-white h-fit p-4 rounded-lg'>
          <div>
            <span className='mb-7 text-lg font-semibold block'>
              Kiện hàng gồm
            </span>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row items-center'>
                <Image
                  src='/products/belt-1.png'
                  width={100}
                  height={100}
                  alt='pack'
                />
                <div className='flex flex-col ml-2'>
                  <span className='font-semibold text-lg'>Thắt lưng nam</span>
                  <span className='text-gray-500 text-sm'>
                    Bán và giao bởi GUMAC Official store
                  </span>
                  <span className='text-sm mt-2 text-gray-400'>
                    Số lượng: 1
                  </span>
                </div>
              </div>
              <div className='flex flex-row items-center'>
                <Image
                  src='/products/belt-2.png'
                  width={100}
                  height={100}
                  alt='pack'
                />
                <div className='flex flex-col ml-2'>
                  <span className='font-semibold text-lg'>Thắt lưng nam</span>
                  <span className='text-gray-500 text-sm'>
                    Bán và giao bởi GUMAC Official store
                  </span>
                  <span className='text-sm mt-2 text-gray-400'>
                    Số lượng: 1
                  </span>
                </div>
              </div>
              <div className='flex flex-row items-center'>
                <Image
                  src='/products/belt-3.png'
                  width={100}
                  height={100}
                  alt='pack'
                />
                <div className='flex flex-col ml-2'>
                  <span className='font-semibold text-lg'>Thắt lưng nam</span>
                  <span className='text-gray-500 text-sm'>
                    Bán và giao bởi GUMAC Official store
                  </span>
                  <span className='text-sm mt-2 text-gray-400'>
                    Số lượng: 1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
