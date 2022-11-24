import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { schema } from './schema'
import { EditorView } from 'prosemirror-view'
// @ts-ignore
import { exampleSetup } from 'prosemirror-example-setup'
// @ts-ignore
import { keymap } from 'prosemirror-keymap'
import './style.css'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider('wss://demos.yjs.dev', 'prosemirror', ydoc)
const type = ydoc.getXmlFragment('prosemirror')

const editor = document.querySelector('#editor')

const prosemirrorView = new EditorView(editor, {
  state: EditorState.create({
    schema,
    plugins: [
      ySyncPlugin(type),
      yCursorPlugin(provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo
      })
    ].concat(exampleSetup({ schema }))
  })
})

// @ts-ignore
window.example = { provider, ydoc, type, prosemirrorView }
