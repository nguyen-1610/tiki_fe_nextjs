'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query');

  return <>Search: query {query}</>;
}
