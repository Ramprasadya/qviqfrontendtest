
import dynamic from 'next/dynamic'

const Product = dynamic(() => import('@/components/Website/Products/Product'), {
  ssr: false 
})
import React from 'react'
import { serverUrl } from '@/config';

export const metadata = {
    title: 'Qviq - Products',
    keywords: ["hassle free site builder"],
  };


const getProducts = async () => {
  const response = await fetch(
    `${serverUrl}/product/getProducts/newest`
  );
  const allProducts = await response.json();

  return allProducts;
};

export default async function page() {
  const defaultProducts = await getProducts();
  return (
    <Product defaultProducts={defaultProducts}/>
  )
}
