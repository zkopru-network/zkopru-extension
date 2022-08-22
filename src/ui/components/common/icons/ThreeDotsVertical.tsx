import * as React from 'react'
import { SVGProps } from 'react'

const SvgThreeDotsVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#three-dots-vertical_svg__a)">
      <path
        d="M17.875 8.125c.547 0 1.072.198 1.458.55.387.35.605.828.605 1.325s-.218.974-.605 1.326c-.386.351-.911.549-1.458.549a2.171 2.171 0 0 1-1.458-.55A1.793 1.793 0 0 1 15.812 10c0-.497.218-.974.605-1.326.386-.351.911-.549 1.458-.549Zm-6.875 0c.547 0 1.072.198 1.458.55.387.35.604.828.604 1.325s-.217.974-.604 1.326c-.386.351-.911.549-1.458.549a2.171 2.171 0 0 1-1.458-.55A1.793 1.793 0 0 1 8.938 10c0-.497.217-.974.604-1.326.386-.351.911-.549 1.458-.549Zm-6.875 0c.547 0 1.072.198 1.458.55.387.35.604.828.604 1.325s-.217.974-.604 1.326c-.386.351-.911.549-1.458.549a2.171 2.171 0 0 1-1.458-.55A1.793 1.793 0 0 1 2.063 10c0-.497.217-.974.604-1.326.386-.351.911-.549 1.458-.549Z"
        fill="#EDF0FF"
      />
    </g>
    <defs>
      <clipPath id="three-dots-vertical_svg__a">
        <path fill="#fff" transform="rotate(-90 10 10)" d="M0 0h20v22H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgThreeDotsVertical
