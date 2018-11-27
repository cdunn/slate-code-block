// @flow
import { KeyUtils } from 'slate'

import { onKeyDown, onPaste } from './handlers'
import Options, { type OptionsFormat } from './options'
import core from './core'

let keyCtr = 0

/**
 * A Slate plugin to handle keyboard events in code blocks.
 */

function EditCode(optsParam?: OptionsFormat = {}): Object {
    // Remove when sharing slate
    KeyUtils.setGenerator(() => `slateCodeBlock${keyCtr++}`)

    const opts = new Options(optsParam);

    const corePlugin = core(opts);
    return {
        ...corePlugin,

        onKeyDown: onKeyDown.bind(null, opts),
        onPaste: onPaste.bind(null, opts)
    };
}

export default EditCode;
