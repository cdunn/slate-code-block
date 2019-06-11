/**
 * Return the current code block, from current selection or from a node key.
 */
function getCurrentCode(opts, value, key) {
  let currentBlock
  if (key) {
    currentBlock = value.document.getDescendant(key)
  } else {
    if (!value.selection.start.key) return null
    currentBlock = value.startBlock
  }

  // The structure is always code_block -> code_line -> text
  // So the parent of the currentBlock should be the code_block
  const parent = value.document.getParent(currentBlock.key)
  if (parent && parent.type === opts.containerType) {
    return parent
  }
  return null
}

export default getCurrentCode
