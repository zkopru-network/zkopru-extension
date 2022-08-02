export default function ExtensionFrameWithImage({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-6 justify-center w-[464px] h-[614px] p-8 rounded-lg bg-zk-pattern bg-cover bg-no-repeat theme-sanctum mode-dark">
      {children}
    </div>
  )
}
