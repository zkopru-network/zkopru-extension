import { Ghost } from '../Button/Button.stories'
import { ZkopruLogoWhite } from '../common/icons'

export default {
  title: 'Screens/Onboarding'
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="pass" className="text-sm">
          Password
        </label>
        <input
          className="input input-md text-base"
          type="password"
          name="pass"
          id="pass"
          autoFocus
        />
        <p className="text-xs bg-red-600/60 text-red-100 p-1 pl-2 rounded-sm tracking-wide">
          🚨 Try a stronger password
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm" className="text-sm">
          Confirm password
        </label>
        <input
          className="input input-bordered text-base"
          type="password"
          name="confirm"
          id="confirm"
        />
      </div>
    </div>
    <Ghost variant="ghost">Register</Ghost>
  </div>
)
