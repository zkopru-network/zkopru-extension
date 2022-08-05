import { ZkopruLogoWhite } from '../../components/common/icons'
import ExtensionFrameWithImage from '../../components/ExtensionFrameWithImage'
import { Password, Submit } from '../../components/Input/Input.stories'

export const Login = () => (
  <ExtensionFrameWithImage>
    <ZkopruLogoWhite />
    <div>
      <h1 className="text-4xl font-medium leading-tight text-white">
        Welcome back!
      </h1>
      <p className="p-1"></p>
      <p className="text-base">Cheap, private transactions are ahead.</p>
    </div>
    <form
      onSubmit={() => console.log('submitted')}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-8">
        <Password id="password" label="Password" type="password" />
      </div>
      <Submit type="submit" id="submit" as="ghost" label="Unlock wallet" />
    </form>
    {/* TODO: Implement forgot password */}
    {/* <a className="cursor-pointer text-skin-text-primary text-xs underline underline-offset-1 font-medium tracking-wide">
        Forgot password?
      </a> */}
  </ExtensionFrameWithImage>
)
