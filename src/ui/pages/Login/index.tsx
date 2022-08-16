import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ZkopruLogoWhite } from '../../components/common/icons'
import ExtensionFrameWithImage from '../../components/ExtensionFrameWithImage'
import Input from '../../components/Input'

const LoginForm = () => {
  const validationSchema = z.object({
    password: z.string().min(1, { message: 'Please enter a password' })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(validationSchema)
  })

  return (
    <form
      onSubmit={handleSubmit((d) => console.log(d))}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-8">
        <Input
          type="password"
          id="password"
          label="Password"
          error={
            errors.password?.message
              ? errors.password.message.toString()
              : undefined
          }
          {...register('password')}
        />
      </div>
      <Input type="submit" label="Unlock wallet" as="ghost" id="loginBtn" />
    </form>
  )
}

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
    <LoginForm />
  </ExtensionFrameWithImage>
)
