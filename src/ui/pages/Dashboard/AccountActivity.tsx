export default function AccountActivity() {
  // TODO: Replace with actual fetched data
  const mockData = [
    {
      date: '2020-01-01',
      type: 'Deposit',
      amount: '0.0029',
      token: 'ETH',
      explorerLink:
        'https://etherscan.io/tx/0x1234567890123456789012345678901234567890'
    },
    {
      date: '2020-01-01',
      type: 'Withdrawal',
      amount: '2.98',
      token: 'ETH',
      explorerLink:
        'https://etherscan.io/tx/0x1234567890123456789012345678901234567890'
    },
    {
      date: '2020-01-01',
      type: 'Send',
      amount: '5000',
      to: '0x1234567890123456789012345678901234567890',
      token: 'USDC',
      explorerLink:
        'https://etherscan.io/tx/0x1234567890123456789012345678901234567890'
    },
    {
      date: '2022-01-01',
      type: 'Withdrawal',
      amount: '2.38',
      token: 'ETH',
      explorerLink:
        'https://etherscan.io/tx/0x234567890123456789012345678901234567890'
    },
    {
      date: '2022-01-01',
      type: 'Deposit',
      amount: '0.0029',
      token: 'ETH',
      explorerLink:
        'https://etherscan.io/tx/0xa3der67890123456789012345678901234567890'
    },
    {
      date: '2021-10-01',
      type: 'Withdrawal',
      amount: '2.98',
      to: '0x1234567890123456789012345678901234567890',
      token: 'ETH',
      explorerLink:
        'https://etherscan.io/tx/0x1234567890123456789012345678901234567890'
    }
  ]

  // Map works better here since the data has no definite shape (i.e. no standard keys)
  const groupByDate = (data: typeof mockData) => {
    return data.reduce((acc, curr) => {
      const date = curr.date
      if (!acc.has(date)) {
        acc.set(date, [])
      }
      acc.set(date, [...(acc.get(date) as typeof mockData), curr])
      return acc
    }, new Map<string, typeof mockData>())
  }

  const activityData = groupByDate(mockData)

  return (
    <ul className="max-h-64 overflow-y-auto mb-2">
      {[...activityData].map(([date, activities], index) => {
        return (
          <div key={index}>
            <li className="text-center bg-skin-light-gray w-full py-1 mb-1 text-xs font-medium">
              {date}
            </li>
            {activities.map((activity, index) => {
              return (
                <li
                  tabIndex={0}
                  className="w-full p-2 py-3 rounded-lg"
                  key={index}
                >
                  <div className="flex justify-between items-center text-xs text-skin-text-primary">
                    <div className="flex justify-between items-center gap-2">
                      {/* TODO: Swap out for arrow icons */}
                      ↗️
                      <div className="flex flex-col">
                        <p>
                          {activity.amount} {activity.type}
                        </p>
                        {/* Check type and if its send theres an to address display it */}
                        {(activity.type === 'Send' ||
                          activity.type === 'Withdraw') &&
                        activity.to ? (
                          <p className="opacity-70">
                            to {activity.to.slice(0, 6)}...
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="">
                      <a
                        href={activity.explorerLink}
                        className="underline text-tab-selected hover:opacity-50"
                      >
                        View on explorer 🡕
                      </a>
                    </div>
                  </div>
                </li>
              )
            })}
          </div>
        )
      })}
    </ul>
  )
}
