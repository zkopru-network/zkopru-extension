import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ExtensionFrame from '../../components/ExtensionFrame'
import Input from '../../components/Input'

const TransferForm = () => {
  const minValue = 0.00001

  const validationSchema = z.object({
    // TODO: @tkmct - Need to update the minimum here
    amount: z.number({
      required_error: 'Please enter an amount',
      invalid_type_error: 'Amount must be a number'
    }),
    recepient: z
      .string()
      .min(1, { message: 'What address are you sending to?' }),
    fee: z.number({
      required_error: 'Please enter a fee',
      invalid_type_error: 'Fee must be a number'
    })
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
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          id="recepient"
          label="To"
          error={
            errors.recepient?.message
              ? errors.recepient.message.toString()
              : undefined
          }
          {...register('recepient')}
          placeholder="ZKOPRU address"
        />
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3">
            <Input
              type="text"
              id="amount"
              label="Amount"
              error={
                errors.amount?.message
                  ? errors.amount.message.toString()
                  : undefined
              }
              {...register('amount', { valueAsNumber: true })}
              defaultValue={minValue}
            />
          </div>
          <div className="col-span-2">
            <Input
              type="text"
              id="fee"
              label="Fees"
              error={
                errors.fee?.message ? errors.fee.message.toString() : undefined
              }
              {...register('fee', { valueAsNumber: true })}
              defaultValue={minValue}
            />
          </div>
        </div>
        <Input
          type="submit"
          label="Send"
          as="ghost"
          id="loginBtn"
          extendClasses="self-stretch"
        />
      </div>
    </form>
  )
}

export const Transfer = () => (
  <ExtensionFrame>
    <p>
      <button className="text-sm">&lt; Home</button>
    </p>
    <h1 className="text-2xl font-semibold leading-tight">Send tokens</h1>
    <TransferForm />
  </ExtensionFrame>
)
