import MyAccount from '@/components/AccountSettings/MyAccount'
import React from 'react'

export const metadata = {
  title: 'Qviq - My Accounts',
};

export default function myaccount({params}) {
  return (
    <MyAccount userName={params.userName} />
  )
}
