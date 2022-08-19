import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import ExtensionFrame from '../../components/ExtensionFrame'
import Input from '../../components/Input'
import { TokenSelector } from '../../components/TokenSelector'

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
    }),
    token: z.string().min(1, { message: 'Please select a token' })
  })

  type FormData = z.infer<typeof validationSchema>

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema)
  })

  return (
    // TODO: Update form with new token balances + fees after successful transfer
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

        <div className="grid grid-cols-6 gap-3 items-center">
          <div className="col-span-4">
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
            <Controller
              control={control}
              name="token"
              defaultValue="ETH"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <TokenSelector
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                  name={name}
                  data={[
                    {
                      id: 1,
                      name: 'Ethereum',
                      symbol: 'ETH',
                      icon: '✨'
                    },
                    {
                      id: 2,
                      name: 'USD Coin',
                      symbol: 'USDC',
                      icon: '💵'
                    },
                    {
                      id: 3,
                      name: 'Ripple',
                      symbol: 'XRP',
                      icon: '💸'
                    }
                  ]}
                />
              )}
            />
          </div>
        </div>
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
        <Input
          type="submit"
          label="Send tokens"
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
    {/* TODO: Make back button component @thebeyondr */}
    <p>
      <button className="text-sm">&lt; Home</button>
    </p>
    <h1 className="text-2xl font-bold leading-tight">Send</h1>
    <TransferForm />
  </ExtensionFrame>
)
