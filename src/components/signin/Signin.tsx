'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

function Signout() {
  return (
    <button
    onClick={() => signIn()}
    className="w-[100%] text-start block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
    >Sign In</button>
  )
}

export default Signout