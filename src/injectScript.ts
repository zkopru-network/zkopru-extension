import log from 'loglevel'

/**
 * @description inject external script in page with script tag
 * @param  {string} file file path to inject into a page
 */
export function injectScript(file: string) {
  try {
    const container = document.head || document.documentElement
    const tag = document.createElement('script')
    tag.setAttribute('type', 'text/javascript')
    tag.setAttribute('src', file)
    container.appendChild(tag)
  } catch (e) {
    log.error('Zkopru: InitScript injection failed.', e)
  }
}
