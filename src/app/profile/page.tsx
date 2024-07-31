'use client'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState('empty')

  const getUserDetails = async () => {
    const response = await axios.get(`/api/users/me`)
    console.log(response.data);
    setData(response.data.data._id)

  }

  const logout = async () => {
    await axios.get(`/api/users/logout`)
    toast.success('user logged out')
    router.push('/login')

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
      </Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Logout</button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >GetUser Details</button>


    </div>
  )
}

export default ProfilePage
