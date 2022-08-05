import {
  ArrowDownSFill,
  EyeLine,
  IconShield,
  ThreeDotsVertical
} from '../common/icons'
import RoundedButton from '../RoundedButton'

export const Overview = () => (
  //  TODO: Update bg gradient
  <div className="h-32 flex flex-col justify-between bg-zk-pattern bg-cover bg-no-repeat rounded-3xl p-5 text-white text-sm">
    <section className="flex justify-between items-center">
      {/* TODO: Maybe this is its own component? */}
      <div className="flex gap-1 justify-center items-center relative">
        {/* <div className="relative"> */}
        <IconShield />
        {/* </div> */}
        <p className="text-xs text-white" title="Account name">
          Jörmungandr
        </p>
        <ArrowDownSFill className="opacity-70" />
      </div>
      <div className="flex gap-4 text-white items-center relative">
        <p className="text-white text-xl font-medium" title="Current balance">
          $0.00
        </p>
        {/* TODO: Swap with other icon and trigger privacy */}
        <EyeLine
          className="peer hover:opacity-70"
          aria-describedby="privacy-tip"
        />
        {/* TODO: Make a tooltip component? */}
        <div
          className="absolute top-0 right-0 origin-top-right w-28 mr-16 invisible peer-hover:visible z-10 pl-2 py-[2px] text-xs bg-black/90 text-white rounded-lg flex justify-center items-center after:content-[''] after:-mr-[9px] after:border-[10px] after:border-t-transparent after:border-l-black/90 after:border-b-transparent after:border-r-transparent after:translate-x-1/2"
          role="tooltip"
          id="privacy-tip"
        >
          Hide balances
        </div>
        <ThreeDotsVertical />
      </div>
    </section>
    <section className="flex justify-between items-center">
      <RoundedButton variant="secondary">Copy address</RoundedButton>
      <div className="flex gap-2">
        <RoundedButton variant="primary">Deposit</RoundedButton>
        <RoundedButton variant="primary">Withdraw</RoundedButton>
      </div>
    </section>
  </div>
)
