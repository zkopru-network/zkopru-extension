import { Ghost } from '../../components/Button/Button.stories'
import { ZkopruLogoWhite } from '../../components/common/icons'
import { Password } from '../../components/Input/Input.stories'

export default {
  title: 'Screens/Auth/Login'
}

export const Login = () => (
  <div className="flex flex-col gap-6 w-[464px] h-[614px] p-8 rounded-lg justify-center bg-zk-pattern bg-cover bg-no-repeat theme-sanctum mode-dark">
    <ZkopruLogoWhite />
    <div>
      <h1 className="text-4xl font-medium leading-tight text-white">
        Welcome back!
      </h1>
      <p className="p-1"></p>
      <p className="text-base">Cheap, private transactions are ahead.</p>
    </div>
    <div className="flex flex-col gap-8">
      <Password id="password" />
    </div>
    <Ghost variant="ghost">Unlock wallet</Ghost>
    {/* TODO: Implement forgot password */}
    {/* <a className="cursor-pointer text-skin-text-primary text-xs underline underline-offset-1 font-medium tracking-wide">
      Forgot password?
    </a> */}
  </div>
)
