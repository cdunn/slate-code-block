import endsWith from 'ends-with'

import { getCurrentIndent, getCurrentCode } from '../utils'

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
function onBackspace(opts, event, editor, next) {
  const { value } = editor
  if (value.selection.isExpanded) {
    return next()
  }

  const { selection, startText } = value

  const currentLine = value.startBlock

  // Detect and remove indentation at cursor
  const indent = getCurrentIndent(opts, value)
  const beforeSelection = currentLine.text.slice(0, selection.start.offset)

  // If the line before selection ending with the indentation?
  if (endsWith(beforeSelection, indent)) {
    // Remove indent
    event.preventDefault()

    return editor.deleteBackward(indent.length).focus()
  } else if (opts.exitBlockType) {
    // Otherwise check if we are in an empty code container...
    const currentCode = getCurrentCode(opts, value)
    const isStartOfCode =
      selection.start.offset === 0 && currentCode.getFirstText() === startText
    // PERF: avoid checking for whole currentCode.text
    const isEmpty =
      currentCode.nodes.size === 1 && currentLine.text.length === 0

    if (isStartOfCode && isEmpty) {
      event.preventDefault()
      // Convert it to default exit type
      editor.withoutNormalizing(() => {
        editor.setBlocks(opts.exitBlockType).unwrapNodeByKey(currentLine.key)
      })
      return editor
    }
  }
  return next()
}

export default onBackspace
