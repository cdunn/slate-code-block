// @flow

import { Block, Text } from 'slate'
import { type Editor } from 'slate-react'
import { isKeyHotkey } from 'is-hotkey'

import { getCurrentCode } from '../utils'
import type Options from '../options'

const isArrowDown = isKeyHotkey('arrowdown')
const isArrowUp = isKeyHotkey('arrowup')

/**
 * User pressed arrow down or up in an editor and on last or first line of code
 * block respectively:
 * Append or prepend an exit block
 */
function onArrow(
    opts: Options,
    event: *,
    editor: Editor,
    next: *
): void | Editor {
    const { value } = editor;
    if (value.selection.isExpanded) {
        return next();
    }

    const { selection, startText, document } = value;

    const currentLine = value.startBlock;
    const nextBlock = document.getNextBlock(currentLine.key);
    const prevBlock = document.getPreviousBlock(currentLine.key);
    if (isArrowUp(event) && currentLine.type === opts.lineType && !prevBlock) {
        event.preventDefault();
        // editor.splitBlock(10).moveToStartOfDocument().setBlocks({
        //     type: opts.exitBlockType,
        //     text: Text.create(),
        //     isVoid: false,
        // })
      const exitBlock = Block.create({ type: opts.exitBlockType, text: Text.create() });
        // editor.moveToStartOfDocument().insertBlock({
        //     type: opts.exitBlockType,
        //     text: Text.create(),
        // })


        editor.moveToStartOfDocument().insertBlock(exitBlock)
      console.log(exitBlock.key);
      editor.moveToStartOfDocument().unwrapNodeByKey(exitBlock.key)
      // unwrapCodeBlock(editor, 'paragraph')
      console.log(editor.value.startBlock.key);
        // console.log(currentLine.key);
        console.log(editor);
      return
       // return editor.unwrapNodeByKey(exitBlock.key);
    } else if (isArrowDown(event) && currentLine.type === opts.lineType && !nextBlock) {
        // event.preventDefault();
        // return editor.moveToEnd().insertBlock({
        //     type: opts.exitBlockType,
        //     text: Text.create(),
        // });
    }

    return next();
}

export default onArrow;
