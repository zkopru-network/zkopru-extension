import React from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../routes'
import { ONBOARDING_URL } from '../../../share/constants'
import {
  ArrowDownSFill,
  EyeLine,
  IconShield,
  ThreeDotsVertical
} from '../common/icons'
import RoundedButton from '../RoundedButton'

export const Overview = () => {
  const navigate = useNavigate()
  // TODO: fetch from background
  const accountName = 'John Doe'
  // TODO: calculate using oracle value?
  const inUSD = 2022

  return (
    <div className="h-32 bg-gradient-to-br from-skin-g-primary to-skin-g-secondary rounded-3xl overflow-clip">
      <div className="h-full flex flex-col justify-between bg-zk-logo bg-no-repeat bg-right p-5 text-white text-sm">
        <section className="flex justify-between items-center">
          {/* TODO: Maybe this is its own component? */}
          <div className="flex gap-1 justify-center items-center relative">
            <IconShield />
            <p className="text-xs text-white" title="Account name">
              {accountName}
            </p>
            <ArrowDownSFill className="text-white/60" />
          </div>
          <div className="flex gap-4 text-white items-center relative">
            <p
              className="text-white text-xl font-medium"
              title="Current balance"
            >
              ${inUSD ? inUSD.toLocaleString() : 0}
            </p>
            {/* TODO: Swap with other icon and trigger privacy */}
            <EyeLine
              className="peer hover:opacity-70"
              aria-describedby="privacy-tip"
            />
            {/* TODO: Make a tooltip component? */}
            <div
              className="absolute top-0 right-0 origin-top-right w-28 mr-16 invisible peer-hover:visible z-10 pl-2 py-[2px] text-xs bg-skin-back text-skin-text-primary rounded-lg flex justify-center items-center after:content-[''] after:-mr-[9px] after:border-[10px] after:border-t-transparent after:border-l-skin-back after:border-b-transparent after:border-r-transparent after:translate-x-1/2 transition"
              role="tooltip"
              id="privacy-tip"
            >
              Privacy mode
            </div>
            <ThreeDotsVertical />
          </div>
        </section>
        <section className="flex justify-between items-center">
          <RoundedButton
            variant="secondary"
            addClasses="text-white bg-skin-inverse/20"
          >
            Copy address
          </RoundedButton>
          <div className="flex gap-2">
            <RoundedButton
              variant="primary"
              onClick={() => {
                open(`${ONBOARDING_URL}/deposit`)
                close()
              }}
            >
              Deposit
            </RoundedButton>
            <RoundedButton
              variant="primary"
              onClick={() => navigate(ROUTES.WITHDRAW)}
            >
              Withdraw
            </RoundedButton>
          </div>
        </section>
      </div>
    </div>
  )
}
