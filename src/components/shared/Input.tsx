import React, { forwardRef } from 'react';

type PropsType = {
  icon?: React.ReactNode;
  button?: React.ReactNode;
};
export const Input = forwardRef(
  (
    {
      icon,
      button,
      ...rest
    }: PropsType & React.InputHTMLAttributes<HTMLInputElement>,
    ref,
  ) => {
    return (
      <div className='relative w-fit h-fit'>
        <div className='absolute top-1/2 -translate-y-1/2 left-3'>{icon}</div>
        <input
          {...rest}
          ref={ref as any}
          className={`${rest.className} border border-gray-300 rounded-lg pl-12 pt-2 pb-2 pr-28 outline-none`}
        />
        <div className='absolute flex items-center justify-center top-1/2 right-0 rounded-tr-lg rounded-br-lg w-1/3 h-full max-w-24 -translate-y-1/2  text-center text-blue-500 after:inline-block after:absolute after:-left-0 after:h-[60%] after:-translate-y-1/2 after:top-1/2 after:w-[1px] after:bg-gray-300 hover:bg-[#0a68ff33]'>
          {button}
        </div>
      </div>
    );
  },
);
