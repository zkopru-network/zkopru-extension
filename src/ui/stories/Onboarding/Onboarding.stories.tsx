import { Ghost } from '../../components/Button/Button.stories'
import { ZkopruLogoWhite } from '../../components/common/icons'
import { Password } from '../../components/Input/Input.stories'

export default {
  title: 'Screens/Auth/Onboarding'
}

export const Onboarding = () => (
  <div className="flex flex-col gap-6 w-[464px] h-[614px] p-8 rounded-lg justify-center bg-zk-pattern bg-cover bg-no-repeat theme-sanctum mode-dark">
    <ZkopruLogoWhite />
    <div>
      <h1 className="text-4xl font-medium leading-tight text-white">
        First things first
      </h1>
      <p className="p-2"></p>
      <p className="text-base tracking-wide">
        To get started, enter a strong password. We suggest using a password
        manager, if you can.
      </p>
    </div>
    {/* TODO: Create input components */}
    <div className="flex flex-col gap-8">
      <Password id="password" />
      <Password id="confirm" label="Confirm password" />
    </div>
    <Ghost variant="ghost">Register</Ghost>
  </div>
)
