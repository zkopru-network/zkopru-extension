import * as React from 'react'
import { SVGProps } from 'react'

const SvgIconShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m6 .083 4.793 1.066c.267.059.457.295.457.569v5.826a3.5 3.5 0 0 1-1.559 2.912L6 12.916l-3.691-2.46A3.499 3.499 0 0 1 .75 7.544V1.718c0-.274.19-.51.457-.57L6 .084Zm2.597 4.213L5.71 7.183l-1.65-1.65-.825.825L5.71 8.833l3.712-3.712-.825-.825Z"
      fill="#34FFC2"
    />
  </svg>
)

export default SvgIconShield
