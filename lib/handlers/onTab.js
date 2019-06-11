import { getCurrentIndent } from '../utils'
import { indentLines } from '../changes'

/**
 * User pressed Tab in an editor:
 * Insert a tab after detecting it from code block content.
 */
function onTab(opts, event, editor, next) {
  const { value } = editor
  event.preventDefault()
  event.stopPropagation()

  const {
    selection: { isCollapsed },
  } = value
  const indent = getCurrentIndent(opts, value)

  // Selection is collapsed, we just insert an indent at cursor
  if (isCollapsed) {
    return editor.insertText(indent).focus()
  }

  // We indent all selected lines
  return indentLines(opts, editor, indent)
}

export default onTab
