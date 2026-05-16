import React from 'react';
import Image from 'next/image';

type PropsType = {
  image: string;
};

export const CardBrand = ({ image }: PropsType) => {
  return (
    <div className='w-[16%] border border-gray-200 pb-1 rounded-md flex flex-col gap-1 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] cursor-pointer flex-shrink-0'>
      <Image
        src={image}
        width={200}
        height={200}
        alt='brand'
        unoptimized
        className='rounded-tl-md rounded-tr-md'
      />
    </div>
  );
};
