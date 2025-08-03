'use client'

import { useRouter } from 'next/navigation'
import { login, LoginResponse } from '../actions/login'

import React, { FormEvent, ReactElement, useState } from 'react'
import SubmitButton from '../../components/SubmitButton'

export default function LoginForm(): ReactElement {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })
    setIsPending(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Login failed, an error occurred')
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Login</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="w-full border border-white rounded-md p-2"
              name="email"
              id="email"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="w-full border border-white rounded-md p-2"
              name="password"
              id="password"
              type="password"
            />
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <SubmitButton
            loading={isPending}
            text="Login"
            onPress={() => {
              const form = document.querySelector('form')
              form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            }}
          />
        </form>
      </div>
    </div>
  )
}
