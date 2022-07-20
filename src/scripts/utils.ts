import browser, { Windows } from 'webextension-polyfill'

const NOTIFICATION_HEIGHT = 480
const NOTIFICATION_WIDTH = 320

export async function showPopupWindow(
  path = '',
  params: { [key: string]: string } = {}
) {
  let url = browser.runtime.getURL('popup.html')
  if (params) {
    url += '?'
    Object.keys(params).map((key, i) => {
      url += `${i !== 0 ? '&' : ''}${key}=${params[key]}`
    })
  }

  const options: Windows.CreateCreateDataType = {
    url: `${url}${path && `#${path}`}`,
    type: 'popup',
    width: NOTIFICATION_WIDTH,
    height: NOTIFICATION_HEIGHT,
    left: 0,
    top: 0
  }

  const newWindow = await browser.windows.create(options)
  return newWindow
}
