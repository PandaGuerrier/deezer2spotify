import * as React from 'react'
import { NextUIProvider } from '@nextui-org/react'

export default function MainLayout({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className={"dark:bg-black"}>
        {children}
      </div>

    </NextUIProvider>
  )
}
