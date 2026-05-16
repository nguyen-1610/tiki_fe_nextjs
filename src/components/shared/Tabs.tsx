'use client';
import React from 'react';

type PropsType = {
  defaultTab?: string;
  items: {
    key: string;
    label: string;
    children: React.ReactNode;
  }[];
};
export const Tabs = ({
  items,
  defaultTab,
  ...rest
}: PropsType & React.AllHTMLAttributes<HTMLDivElement>) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || items[0].key);
  return (
    <>
      <div className={`flex flex-row gap-2 ${rest.className}`}>
        {items.map((item) => {
          if (item.key === activeTab)
            return (
              <div
                key={item.key}
                className='py-1.5 flex items-center justify-center cursor-pointer border-[1px] border-blue-500 px-4 rounded-full text-sm text-blue-500 font-semibold'
              >
                {item.label}
              </div>
            );
          return (
            <div
              key={item.key}
              className='py-1 flex items-center justify-center cursor-pointer border-[1px] border-gray-300 px-4 rounded-full text-gray-500 text-sm'
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <div className='overflow-hidden'>
        {items.map(
          (item) =>
            item.key === activeTab && <div key={item.key}>{item.children}</div>,
        )}
      </div>
    </>
  );
};
