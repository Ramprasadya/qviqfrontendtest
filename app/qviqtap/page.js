import dynamic from 'next/dynamic'
const QviqTap= dynamic(() => import('@/components/Website/Products/QviqTap'), {
  ssr: false 
})
import React from 'react'
import { serverUrl } from '@/config';

export const metadata = {
    title: 'Qviq - QviqTap',
    keywords: ["premium nfc cards"],
  };


const getProducts = async () => {
  const response = await fetch(
    `${serverUrl}/product/getProducts/default`
  );
  const allProducts = await response.json();

  return allProducts;
};

export default async function page() {
  const defaultProducts = await getProducts();
  return (
    <QviqTap defaultProducts={defaultProducts}/>
  )
}
