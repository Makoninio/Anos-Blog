'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Highlight from '@tiptap/extension-highlight'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import FontSize from '@tiptap/extension-font-size'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { useEffect, useState, useRef } from 'react'
import { client } from '../../../lib/sanity'

export default function RichTextEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { setMounted(true) }, [])
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Underline,
      Strike,
      Highlight.configure({ multicolor: true }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Code,
      CodeBlock,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      FontFamily,
      FontSize,
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  // Image upload handler
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    // Upload to Sanity
    const imageAsset = await client.assets.upload('image', file, { filename: file.name })
    // Insert image at cursor
    editor.chain().focus().setImage({ src: imageAsset.url }).run()
    // Reset file input
    e.target.value = ''
  }

  if (!mounted) return null
  return (
    <div className="border rounded p-2 bg-white">
      {editor && (
        <div className="flex flex-wrap gap-1 mb-2 items-center">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}><b>B</b></button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}><i>I</i></button>
          <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>U</button>
          <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>S</button>
          <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>Highlight</button>
          <input
            type="color"
            title="Text color"
            className="w-6 h-6 p-0 border rounded"
            value={editor.getAttributes('textStyle').color || '#000000'}
            onChange={e => editor.chain().focus().setColor(e.target.value).run()}
          />
          <input
            type="color"
            title="Background color"
            className="w-6 h-6 p-0 border rounded"
            value={editor.getAttributes('highlight').color || '#ffff00'}
            onChange={e => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
          />
          <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>P</button>
          {[1,2,3,4,5,6].map(level => (
            <button key={level} type="button" onClick={() => editor.chain().focus().toggleHeading({ level }).run()} className={editor.isActive('heading', { level }) ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>H{level}</button>
          ))}
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>• List</button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>1. List</button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>❝</button>
          <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>{'<>'}</button>
          <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>{'</>'}</button>
          <button type="button" onClick={() => {
            const url = window.prompt('Enter URL')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }} className={editor.isActive('link') ? 'bg-amber-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded border'}>🔗</button>
          <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className="px-2 py-1 rounded border">Unlink</button>
          <select
            className="border rounded text-sm px-1 py-1"
            value={editor.getAttributes('textAlign').textAlign || 'left'}
            onChange={e => editor.chain().focus().setTextAlign(e.target.value as any).run()}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
          <select
            className="border rounded text-sm px-1 py-1"
            value={editor.getAttributes('fontFamily').fontFamily || ''}
            onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
          >
            <option value="">Font</option>
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans</option>
            <option value="monospace">Mono</option>
          </select>
          <select
            className="border rounded text-sm px-1 py-1"
            value={editor.getAttributes('fontSize').fontSize || ''}
            onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
          >
            <option value="">Size</option>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="24px">24</option>
            <option value="32px">32</option>
          </select>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            className="border border-amber-700 text-amber-700 bg-white px-2 py-1 rounded text-sm hover:bg-amber-50"
            onClick={() => fileInputRef.current?.click()}
          >
            🖼️ Image
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
} 