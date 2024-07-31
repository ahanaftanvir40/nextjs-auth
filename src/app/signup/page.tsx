"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SignupPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [loading, setLoading] = useState(false)

  const [buttonDisabled, setButtonDisabled] = useState(true)


  const onSubmit = async () => {

    try {
      setLoading(true)
      const response = await axios.post(`/api/users/signup`, user)
      console.log("Signup successfull", response.data);
      if (response) {
        setLoading(false)
      }
      router.push('/login')




    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing...' : 'Signup'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        type="text" />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSubmit}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "Fill Form" : "Signup"}</button>
      <Link href="/login">Already SignedUp? Visit login page</Link>
    </div>
  )
}

export default SignupPage