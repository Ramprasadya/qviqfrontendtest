import ManageSubscription from '@/components/AccountSettings/ManageSubscription'
import React from 'react'

export const metadata = {
  title: 'Qviq - Manage Subscription',
};

export default function page({params}) {
  return (
    <ManageSubscription userName={params.userName} />
  )
}
