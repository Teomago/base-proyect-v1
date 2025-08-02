import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

import Home from './pages/home'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="flex flex-col justify-between items-center h-screen p-12 max-w-4xl mx-auto overflow-hidden">
      <div className="w-full">
        <Home />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1 className="text-4xl font-bold mt-10">Welcome to your new project.</h1>}
        {user && <h1 className="text-4xl font-bold mt-10">Welcome back, {user.email}</h1>}
        <div className="flex items-center gap-3 mt-6">
          <a
            className="text-black bg-white border border-black px-2 py-1 rounded"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="text-white bg-black border border-white px-2 py-1 rounded"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 mt-6">
        <p className="m-0">Update this page by editing</p>
        <a className="no-underline px-2 py-1 bg-gray-700 rounded text-white" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
