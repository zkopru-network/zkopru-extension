import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ZkopruLogoWhite } from '../../components/common/icons'
import ExtensionFrameWithImage from '../../components/ExtensionFrameWithImage'
import Input from '../../components/Input'

export type FormData = {
  password: string
  confirmPassword: string
}

type RegistrationFormProps = {
  onSubmit: (data: FormData) => void
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const validationSchema = z
    .object({
      password: z
        .string()
        .min(8, {
          message: 'Password should be 8-64 characters'
        })
        .max(64, { message: 'Password should be 8-64 characters' }),
      confirmPassword: z.string()
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
      message: 'Passwords should match',
      path: ['confirmPassword']
    })

  type FormData = z.infer<typeof validationSchema>

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
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
        <Input
          type="password"
          id="confirm"
          label="Confirm password"
          {...register('confirmPassword')}
          error={
            errors.confirmPassword?.message
              ? errors.confirmPassword.message.toString()
              : undefined
          }
        />
        <Input
          type="submit"
          label="Create account"
          as="ghost"
          id="registerBtn"
        />
      </div>
    </form>
  )
}

type OnboardingProps = {
  onSubmit: (data: FormData) => void
}

export const Onboarding = ({ onSubmit }: OnboardingProps) => (
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
    <RegistrationForm onSubmit={onSubmit} />
  </ExtensionFrameWithImage>
)
