import { ReactNode } from 'react'
import Header from './common/Header'

export default function ExtensionFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 w-[464px] h-[614px] p-8 rounded-lg bg-skin-back overflow-hidden relative">
      <Header />
      {children}
    </div>
  )
}
