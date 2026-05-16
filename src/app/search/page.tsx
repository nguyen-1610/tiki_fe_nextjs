'use client';
import { Suspense } from 'react';
import products from '@/data/products.json';
import { CardProduct } from '@/components/shared/CardProduct';

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<>Loading</>}>
          <div className='flex flex-row flex-wrap gap-2 mb-5'>
            {products.map((product: any) => (
              <CardProduct
                className='w-[23%]'
                key={product.id}
                data={product}
              />
            ))}
          </div>
        </Suspense>
      </nav>
    </>
  );
}
