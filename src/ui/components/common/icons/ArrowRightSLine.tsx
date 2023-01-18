import * as React from 'react'
import { SVGProps } from 'react'

const SvgArrowRightSLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#arrow-right-s-line_svg__a)">
      <path
        d="m13.172 12.5-4.95-4.95 1.414-1.414L16 12.5l-6.364 6.364-1.414-1.414 4.95-4.95Z"
        fill="inherit"
      />
    </g>
    <defs>
      <clipPath id="arrow-right-s-line_svg__a">
        <path fill="inherit" transform="translate(0 .5)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgArrowRightSLine
