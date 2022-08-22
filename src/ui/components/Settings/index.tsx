import { Menu, Transition } from '@headlessui/react'

interface SettingProps {
  label: string
  action: string // TODO: replace with what you need @tkmct
}

const settingOptions = [
  {
    label: 'Switch account',
    action: 'acct_switch'
  },
  {
    label: 'Language',
    action: 'lang_switch'
  },
  {
    label: 'Theme',
    action: 'theme_switch'
  }
]

const linkStyles =
  'flex items-center justify-between px-4 py-2 text-skin-text-primary hover:bg-btn-bright hover:text-white rounded-md'

const Settings = ({
  settings = settingOptions
}: {
  settings?: SettingProps[]
}) => (
  <Menu as="div" className="relative text-xs text-skin-text-primary">
    <Menu.Button
      type="button"
      className="bg-skin-light-gray border border-skin-text-primary/10 inline-flex items-center font-medium gap-1 rounded-full pl-3 transition hover:bg-opacity-70 focus:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-btn-bright focus:ring-offset-2 focus:ring-offset-skin-back overflow-clip"
    >
      <div className="my-1 inline-flex gap-2 text-skin-text-primary hover:text-opacity-80">
        Menu
      </div>
      <span className="bg-btn-bright/40 rounded-full h-7 w-7 p-2 m-0 flex justify-center items-center border border-skin-text-primary/40">
        💀
      </span>
    </Menu.Button>
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Menu.Items className="absolute origin-top-right top-0 right-0 w-36 mt-2 mr-2 bg-skin-light-gray flex flex-col shadow-lg shadow-skin-text-primary/10 rounded-md text-skin-text-primary/80 font-medium overflow-hidden p-1">
        {settings.map(({ label, action }, index) => (
          <Menu.Item as="button" key={index}>
            {({ active }) => (
              <a
                className={
                  active
                    ? `${linkStyles} bg-btn-bright text-white`
                    : `${linkStyles}`
                }
                // Replace with someFn(chainId)
                onClick={() => console.log(action)}
              >
                {label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
)

export default Settings
