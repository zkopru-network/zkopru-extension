import { ZkopruLogoWhite } from '../../components/common/icons'
import ExtensionFrameWithImage from '../../components/ExtensionFrameWithImage'
import { Password, Submit } from '../../components/Input/Input.stories'

export const Onboarding = () => (
  <ExtensionFrameWithImage>
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
    <form>
      <div className="flex flex-col gap-8">
        <Password type="password" id="password" label="Password" />
        <Password type="password" id="confirm" label="Confirm password" />
        <Submit type="submit" label="Create account" as="ghost" id="register" />
      </div>
    </form>
  </ExtensionFrameWithImage>
)
