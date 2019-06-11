import wrapCodeBlockByKey from './wrapCodeBlockByKey'

/**
 * Wrap current block into a code block.
 */
function wrapCodeBlock(opts, editor) {
  const { value } = editor
  const { startBlock, selection } = value

  // Convert to code block
  wrapCodeBlockByKey(opts, editor, startBlock.key)

  // Move selection back in the block
  editor
    .moveToStartOfNode(editor.value.document.getDescendant(startBlock.key))
    .moveTo(selection.start.offset)

  return editor
}

export default wrapCodeBlock
