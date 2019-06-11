import getIndent from './getIndent'
import getCurrentCode from './getCurrentCode'

/**
 * Detect indentation in the current code block
 */
function getCurrentIndent(opts, value) {
  if (opts.getIndent) {
    return opts.getIndent(value)
  }

  const currentCode = getCurrentCode(opts, value)
  if (!currentCode) {
    return ''
  }

  const text = currentCode
    .getTexts()
    .map((t) => t.text)
    .join('\n')
  return getIndent(text)
}

export default getCurrentIndent
