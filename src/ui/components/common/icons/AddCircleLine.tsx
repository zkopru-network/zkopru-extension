import * as React from 'react'
import { SVGProps } from 'react'

const SvgAddCircleLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={14}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6.333 6.333V3.667h1.334v2.666h2.667v1.334H7.667v2.666H6.334V7.667H3.667V6.333h2.667ZM7 13.667A6.667 6.667 0 1 1 7 .334a6.667 6.667 0 0 1 0 13.333Zm0-1.334A5.333 5.333 0 1 0 7 1.667a5.333 5.333 0 0 0 0 10.666Z" />
  </svg>
)

export default SvgAddCircleLine
