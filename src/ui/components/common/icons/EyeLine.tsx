import * as React from 'react'
import { SVGProps } from 'react'

const SvgEyeLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 2.25A8.253 8.253 0 0 1 17.114 9 8.253 8.253 0 0 1 .886 9 8.253 8.253 0 0 1 9 2.25Zm0 12A6.754 6.754 0 0 0 15.583 9 6.754 6.754 0 0 0 2.417 9 6.754 6.754 0 0 0 9 14.25Zm0-1.875a3.375 3.375 0 1 1 0-6.75 3.375 3.375 0 0 1 0 6.75Zm0-1.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z"
      fill="#EDF0FF"
    />
  </svg>
)

export default SvgEyeLine
