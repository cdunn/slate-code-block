import { Document } from 'slate'
import { getEventTransfer } from 'slate-react'

import { getCurrentCode, deserializeCode } from '../utils'

/**
 * User is pasting content, insert it as text
 */
function onPaste(opts, event, editor, next) {
  const { value } = editor
  const data = getEventTransfer(event)
  const currentCode = getCurrentCode(opts, value)

  // Only handle paste when selection is completely a code block
  const { endBlock } = value
  if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
    return next()
  }

  // Convert to text if needed
  let text
  if (data.type === 'fragment') {
    text = data.fragment
      .getTexts()
      .map((t) => t.text)
      .join('\n')
  } else {
    text = data.text
  }

  // Convert the text to code lines
  const lines = deserializeCode(opts, text).nodes

  const fragment = Document.create({ nodes: lines })

  return editor.insertFragment(fragment)
}

export default onPaste
