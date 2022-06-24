import browser, { Windows } from 'webextension-polyfill'

const NOTIFICATION_HEIGHT = 480
const NOTIFICATION_WIDTH = 320

export async function showPopupWindow() {
  const options: Windows.CreateCreateDataType = {
    url: 'popup.html',
    type: 'popup',
    width: NOTIFICATION_WIDTH,
    height: NOTIFICATION_HEIGHT,
    left: 0,
    top: 0
  }

  const newWindow = await browser.windows.create(options)
  return newWindow
}
