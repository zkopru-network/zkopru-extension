export default function ExtensionFrame({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-8 w-[464px] h-[614px] p-8 rounded-lg bg-skin-back">
      {children}
    </div>
  )
}
