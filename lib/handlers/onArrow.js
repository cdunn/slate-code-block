import { Block, Text } from 'slate'
import { isKeyHotkey } from 'is-hotkey'

import { getCurrentCode } from '../utils'
import { unwrapCodeBlock } from '../changes'

const isArrowDown = isKeyHotkey('arrowdown')
const isArrowUp = isKeyHotkey('arrowup')

/**
 * User pressed arrow down or up in an editor and on last or first line of code
 * block respectively:
 * Append or prepend an exit block
 */
function onArrow(opts, event, editor, next) {
  const { value } = editor
  if (value.selection.isExpanded) {
    return next()
  }

  const { selection, startText, document } = value

  const currentLine = value.startBlock
  const nextBlock = document.getNextBlock(currentLine.key)
  const prevBlock = document.getPreviousBlock(currentLine.key)
  if (isArrowUp(event) && currentLine.type === opts.lineType && !prevBlock) {
    console.log('plugin arrow up')
    event.preventDefault()
    editor
      .moveToStartOfDocument()
      .splitBlock(10)
      .setBlocks({
        type: opts.exitBlockType,
        text: '',
        isVoid: false,
      })
    editor.moveToStartOfDocument()
    return unwrapCodeBlock(opts, editor, opts.exitBlockType)
  } else if (
    isArrowDown(event) &&
    currentLine.type === opts.lineType &&
    !nextBlock
  ) {
    console.log('plugin arrow down')
    event.preventDefault()
    return opts.resolvedOnExit(editor)
  }

  return next()
}

export default onArrow
