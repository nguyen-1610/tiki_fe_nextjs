import React from 'react';

type PropsType = {
  style?: string;
};
export const Dot = ({ style }: PropsType) => {
  return (
    <div
      className={`w-4 h-4 rounded-full bg-gray-500 border-gray-300 border-[4px] ${style} `}
    ></div>
  );
};
