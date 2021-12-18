import React, {useCallback, useEffect, useState} from 'react'
import {useEditor, useNode} from '@craftjs/core'
import ParagraphSettings from './Paragraph.Settings'
import {Editor, EditorState} from 'draft-js'
import 'draft-js/dist/Draft.css'
import {useEditor as newUseEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Para from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Code from '@tiptap/extension-code'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import './styles.css'
import {PaperClipIcon} from '@heroicons/react/solid'
import Color from '@tiptap/extension-color'

interface ParagraphProps {
	initTextData?: string
}

const Paragraph = (props: Partial<ParagraphProps>) => {
	const {initTextData} = props

	const [text, setText] = useState('')
	const {enabled, selected} = useEditor((state) => ({
		enabled: state.options.enabled,
		selected: state.events.selected,
	}))
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	)
	console.log(editorState)
	const {
		actions: {setProp},
		connectors: {connect},
	} = useNode()

	const [html, setHtml] = useState(null)
	const editor = newUseEditor({
		extensions: [
			Document,
			Para,
			Text,
			Code,
			Link.configure({
				openOnClick: selected ? false : true,
			}),
			Highlight.configure({
				multicolor: true,
			}),
			Typography,
			StarterKit,
			Underline,
			TextStyle,
			Color,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			FontFamily,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
		],
		content: initTextData,
	})

	useEffect(() => {
		if (!editor) {
			return null
		}

		// Get the initial content …
		setHtml(editor.getHTML())

		// … and get the content after every change.
		editor.on('update', () => {
			setProp((props) => (props.initTextData = editor.getHTML()))
		})
	}, [editor])

	const setContent = useCallback(() => {
		// You can pass a HTML document to the editor.
		editor.commands.setContent(
			`
        <p>
          It’s 19871. You can’t turn on a radio, or go to a mall without hearing Olivia Newton-John’s hit song, Physical.
        </p>
      `,
			true
		)

		// It’s likely that you’d like to focus the Editor after most commands.
		editor.commands.focus()
	}, [editor])

	const clearContent = useCallback(() => {
		editor.chain().clearContent(true).focus().run()
	}, [editor])

	const setLink = () => {
		const previousUrl = editor.getAttributes('link').href
		const url = window.prompt('URL', previousUrl)

		// cancelled
		if (url === null) {
			return
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()

			return
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({href: url}).run()
	}

	const toggleStrike = useCallback(() => {
		editor.chain().focus().toggleStrike().run()
	}, [editor])
	const toggleBold = useCallback(() => {
		editor.chain().focus().toggleBold().run()
	}, [editor])

	const toggleItalic = useCallback(() => {
		editor.chain().focus().toggleItalic().run()
	}, [editor])

	const unlink = useCallback(() => {
		editor.chain().focus().unsetLink().run()
	}, [editor])

	const toggleUnderline = useCallback(() => {
		editor.chain().focus().toggleUnderline().run()
	}, [editor])

	if (!editor) {
		return null
	}
	return (
		<>
			<div ref={connect}>
				<pre>
					{enabled ? (
						<>
							<div className={selected ? 'block' : 'hidden'}>
								<div className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"></div>
								<button className="button" onClick={setContent}>
									Set Content
								</button>

								<button className="button" onClick={clearContent}>
									Clear Content
								</button>
								<button
									onClick={toggleStrike}
									className={editor.isActive('strike') ? 'is-active' : ''}
								>
									Strike
								</button>
								<button
									onClick={toggleBold}
									className={editor.isActive('bold') ? 'is-active' : ''}
								>
									Bold
								</button>
								<button
									onClick={toggleItalic}
									className={editor.isActive('italic') ? 'is-active' : ''}
								>
									Italic
								</button>

								<button
									onClick={toggleUnderline}
									className={editor.isActive('italic') ? 'is-active' : ''}
								>
									underline
								</button>

								<button
									onClick={setLink}
									className={editor.isActive('link') ? 'is-active' : ''}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3 w-3"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
										/>
									</svg>
								</button>
								<button onClick={unlink} disabled={!editor.isActive('link')}>
									unsetLink
								</button>

								<button
									onClick={() => editor.chain().focus().toggleHighlight().run()}
									className={editor.isActive('highlight') ? 'is-active' : ''}
								>
									toggleHighlight
								</button>
							</div>

							<div className="tiz">
								<label htmlFor="tiz-1">color picker</label>
								<input
									type="color"
									hidden
									id="tiz-1"
									onChange={(e) =>
										editor
											.chain()
											.focus()
											.toggleHighlight({color: e.target.value})
											.run()
									}
								/>
							</div>

							<div className="tiz">
								<label htmlFor="text-color-picker">text color</label>
								<input
									type="color"
									hidden
									id="text-color-picker"
									onChange={(e) =>
										editor.chain().focus().setColor(e.target.value).run()
									}
								/>
							</div>

							<button
								onClick={() =>
									editor.chain().focus().toggleHeading({level: 1}).run()
								}
							>
								H1
							</button>
							<button
								onClick={() =>
									editor.chain().focus().toggleHeading({level: 2}).run()
								}
							>
								H2
							</button>
							<button
								onClick={() =>
									editor.chain().focus().toggleHeading({level: 3}).run()
								}
							>
								H3
							</button>

							<div className="w-full">
								<button
									onClick={() =>
										editor.chain().focus().setFontFamily('Inter').run()
									}
									className={
										editor.isActive('textStyle', {fontFamily: 'Inter'})
											? 'is-active'
											: ''
									}
								>
									Inter
								</button>
								<button
									onClick={() =>
										editor
											.chain()
											.focus()
											.setFontFamily('Comic Sans MS, Comic Sans')
											.run()
									}
									className={
										editor.isActive('textStyle', {
											fontFamily: 'Comic Sans MS, Comic Sans',
										})
											? 'is-active'
											: ''
									}
								>
									Comic Sans
								</button>
								<button
									onClick={() =>
										editor.chain().focus().setFontFamily('serif').run()
									}
									className={
										editor.isActive('textStyle', {fontFamily: 'serif'})
											? 'is-active'
											: ''
									}
								>
									serif
								</button>
								<button
									onClick={() =>
										editor.chain().focus().setFontFamily('monospace').run()
									}
									className={
										editor.isActive('textStyle', {fontFamily: 'monospace'})
											? 'is-active'
											: ''
									}
								>
									monospace
								</button>
								<button
									onClick={() =>
										editor.chain().focus().setFontFamily('cursive').run()
									}
									className={
										editor.isActive('textStyle', {fontFamily: 'cursive'})
											? 'is-active'
											: ''
									}
								>
									cursive
								</button>
								<button
									onClick={() => editor.chain().focus().unsetFontFamily().run()}
								>
									unsetFontFamily
								</button>

								<button
									onClick={() =>
										editor.chain().focus().setTextAlign('left').run()
									}
									className={
										editor.isActive({textAlign: 'left'}) ? 'is-active' : ''
									}
								>
									left
								</button>
								<button
									onClick={() =>
										editor.chain().focus().setTextAlign('center').run()
									}
									className={
										editor.isActive({textAlign: 'center'}) ? 'is-active' : ''
									}
								>
									center
								</button>
								<button
									onClick={() =>
										editor.chain().focus().setTextAlign('right').run()
									}
									className={
										editor.isActive({textAlign: 'right'}) ? 'is-active' : ''
									}
								>
									right
								</button>
								<button
									onClick={() =>
										editor.chain().focus().setTextAlign('justify').run()
									}
									className={
										editor.isActive({textAlign: 'justify'}) ? 'is-active' : ''
									}
								>
									justify
								</button>
							</div>
							<EditorContent
								editor={editor}
								onChangeCapture={() =>
									setProp((props) => (props.initTextData = html))
								}
							/>
						</>
					) : (
						<div dangerouslySetInnerHTML={{__html: initTextData}}></div>
					)}
				</pre>
			</div>
		</>
	)
}

Paragraph.craft = {
	displayName: 'Paragraph',
	props: {
		initTextData: null,
	},
}
export default Paragraph
