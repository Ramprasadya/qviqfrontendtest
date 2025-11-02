import LoginPage from '@/components/Login/LoginPage'
import React from 'react'

export const metadata = {
  title: 'Qviq - Login',
  keywords: ["hassle free site builder"],
};

export default function login({searchParams}) {
  return (
    <LoginPage searchParams={searchParams} />
  )
}
