import { getCurrentCode } from '../utils'

/**
 * User is Cmd+A to select all text
 */
function onSelectAll(opts, event, editor, next) {
  const { value } = editor
  event.preventDefault()

  const currentCode = getCurrentCode(opts, value)
  return editor
    .moveToStartOfNode(currentCode.getFirstText())
    .moveFocusToEndOfNode(currentCode.getLastText())
}

export default onSelectAll
