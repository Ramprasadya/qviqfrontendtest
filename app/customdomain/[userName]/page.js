import CustomDomain from '@/components/CustomDomain/CustomDomain';
import React from 'react'

export const metadata = {
  title: 'Qviq - Custom Domain',
};

function customdomain({params}) {
  return (
    <CustomDomain userName={params.userName} />
  )
}

export default customdomain