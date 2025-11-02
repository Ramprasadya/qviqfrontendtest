import Signup from '@/components/Login/Signup'
import React from 'react'

export const metadata = {
  title: 'Qviq - Signup',
  keywords: ["hassle free site builder"],
};

const page = ({searchParams}) => {
  return (
   <>
   <Signup searchParams={searchParams}/>
   </>
  )
}

export default page