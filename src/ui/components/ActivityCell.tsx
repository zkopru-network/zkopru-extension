import React from 'react'
import { css } from '@linaria/core'
import dayjs from 'dayjs'
import { fromWei, shortenString } from '../../share/utils'

type Props = {
  item: any
}

const ActivityCell = ({ item }: Props) => {
  return (
    <div className={itemContainer}>
      <p>{item.type}</p>
      {item.proposal && (
        <div>
          Completed {dayjs(item.proposal.timestamp * 1000).format('HH:mm')}
        </div>
      )}
      <div>
        <span>Amount: {fromWei(item.eth)} ETH</span>
      </div>
      <div>
        <span>Fee: {fromWei(item.fee)} ETH</span>
      </div>
      <div>
        <span>Block Hash:</span>
        <span>
          {item.proposal ? shortenString(item.proposal.hash) : 'Not included'}
        </span>
      </div>
    </div>
  )
}

const itemContainer = css`
  border-bottom: solid 1px lightgray;
`

export default ActivityCell
