import React, {useCallback, useEffect, useState} from 'react'
import {useEditor, useNode} from '@craftjs/core'
import {EditorState} from 'draft-js'
import 'draft-js/dist/Draft.css'
import {EditorContent, useEditor as newUseEditor} from '@tiptap/react'
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
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import Color from '@tiptap/extension-color'
import {ButtonsGroup} from '../../editor'
import classnames from 'classnames'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import ClearIcon from '@mui/icons-material/Clear'
import {Listbox, Transition} from '@headlessui/react'
import {ChromePicker} from 'react-color'
import {ButtonGroup} from '@material-ui/core'
import ParagraphSettings from './ParagraphSettings'

const defaultProps = {
	padding: ['0', '0', '0', '0'],
	margin: ['0', '0', '0', '0'],
	initTextData: ` <p>
	It’s 19871. You can’t turn on a radio, or go to a mall without hearing Olivia Newton-John’s hit song, Physical.
</p>`,
}

const Paragraph = (props: any) => {
	const {initTextData, padding, margin} = props

	const [text, setText] = useState('')
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))
	const {selected} = useNode((state) => ({
		selected: state.events.selected,
	}))
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	)
	const {
		id,
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
	const handleChangeHighlight = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		editor.chain().focus().toggleHighlight({color: event.target.value}).run()
	}
	const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
		editor.chain().focus().setColor(event.target.value).run()
	}
	const renderEdges = useCallback((align) => {
		switch (align) {
			case 'left':
				return 'rounded-l-md'
			case 'middle':
				return '-ml-px'
			case 'right':
				return 'rounded-r-md'
			default:
				return '-ml-px'
		}
	}, [])
	const handleChangeHeading = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			switch (event.target.id) {
				case '1':
					editor.chain().focus().toggleHeading({level: 1}).run()
					break
				case '2':
					editor.chain().focus().toggleHeading({level: 2}).run()
					break
				case '3':
					editor.chain().focus().toggleHeading({level: 3}).run()
					break
				default:
					editor.chain().focus().toggleHeading({level: 1}).run()
					break
			}
		},
		[editor]
	)
	const [hightLight, setHightLight] = useState<string>('#fff')
	const [textColor, setTextColor] = useState<string>('#000')
	const [activeHighLight, setActiveHighlight] = useState<boolean>(false)
	const [activeColor, setActiveColor] = useState<boolean>(false)

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			// @ts-ignore
			switch (event.target.id) {
				case 'highlight-color':
					setActiveHighlight(true)
					break
				case 'text-color':
					setActiveColor(true)
					break
				default:
					return
			}
		},
		[setActiveHighlight, setActiveColor]
	)
	const handleChangeJustifyText = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			// @ts-ignore
			editor.chain().focus().setTextAlign(event.target.name).run()
		},
		[editor]
	)
	const fonts = [
		{name: 'Inter'},
		{name: 'Comic Sans MS, Comic Sans'},
		{name: 'serif'},
		{name: 'monospace'},
		{name: 'cursive'},
	]
	const [fontSelected, setFontSelected] = useState(fonts[0])
	const handleUnsetFont = useCallback(() => {
		editor.chain().focus().unsetFontFamily().run()
		setFontSelected(fonts[0])
	}, [editor])
	const handleChangeFont = useCallback(
		(event) => {
			setFontSelected(event)
			editor.chain().focus().setFontFamily(event.name).run()
		},
		[editor, setFontSelected]
	)

	const ParagraphMenu = () => {
		return (
			<React.Fragment>
				<div className="flex justify-between items-center">
					<ButtonsGroup title="">
						<ButtonsGroup.Item
							id="SMALL"
							onClick={toggleStrike}
							title="S"
							align="middle"
							name="size"
							className={
								editor.isActive('strike')
									? 'bg-indigo-500 line-through'
									: 'line-through'
							}
						/>
						<ButtonsGroup.Item
							id="MEDIUM"
							onClick={toggleBold}
							title="B"
							align="middle"
							name="size"
							className={editor.isActive('bold') ? 'bg-indigo-500' : ''}
						/>
						<ButtonsGroup.Item
							id="LARGE"
							onClick={toggleItalic}
							title="I"
							align="middle"
							name="size"
							className={editor.isActive('italic') ? 'bg-indigo-500' : ''}
						/>
						<ButtonsGroup.Item
							id="LARGE"
							onClick={toggleUnderline}
							title="U"
							align="middle"
							name="size"
							className={editor.isActive('underline') ? 'is-active' : ''}
						/>
						<button
							type="button"
							onClick={setLink}
							className={classnames(
								renderEdges('middle'),
								editor.isActive('link') ? 'is-active' : '',
								'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
							)}
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

						<button
							type="button"
							onClick={unlink}
							disabled={!editor.isActive('link')}
							className={classnames(
								renderEdges('right'),
								editor.isActive('link') ? 'is-active' : '',
								'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3 line-through"
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
						<ButtonsGroup.Item
							id="1"
							onClick={handleChangeHeading}
							title="h1"
							align="middle"
							name="size"
							className={editor.isActive('underline') ? 'is-active' : ''}
						/>
						<ButtonsGroup.Item
							id="2"
							onClick={handleChangeHeading}
							title="h2"
							align="middle"
							name="size"
							className={editor.isActive('underline') ? 'is-active' : ''}
						/>

						<ButtonsGroup.Item
							id="3"
							onClick={handleChangeHeading}
							title="h3"
							align="middle"
							name="size"
							className={editor.isActive('underline') ? 'is-active' : ''}
						/>
						<button
							type="button"
							onClick={handleChangeJustifyText}
							name={'left'}
							className={classnames(
								renderEdges('middle'),
								'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
							)}
						>
							<FormatAlignLeftIcon fontSize="small" />
						</button>
						<button
							type="button"
							onClick={handleChangeJustifyText}
							name={'center'}
							className={classnames(
								renderEdges('middle'),
								'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
							)}
						>
							<FormatAlignCenterIcon fontSize="small" />
						</button>
						<button
							type="button"
							onClick={handleChangeJustifyText}
							name={'right'}
							className={classnames(
								renderEdges('middle'),
								'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
							)}
						>
							<FormatAlignRightIcon fontSize="small" />
						</button>
						<button
							type="button"
							onClick={handleChangeJustifyText}
							name={'justify'}
							className={classnames(
								renderEdges('middle'),
								'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
							)}
						>
							<FormatAlignJustifyIcon fontSize="small" />
						</button>
					</ButtonsGroup>
				</div>
				<div className="px-1">
					<Listbox value={fontSelected} onChange={handleChangeFont}>
						{({open}) => (
							<>
								<div className="relative mt-1">
									<Listbox.Button className="bg-white relative border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
										<span className="block truncate">{fontSelected.name}</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<SelectorIcon
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										show={open}
										as={React.Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
											{fonts.map((font, index) => (
												<Listbox.Option
													key={index}
													className={({active}) =>
														classnames(
															active
																? 'text-white bg-indigo-600'
																: 'text-gray-900',
															'cursor-default select-none relative py-2 pl-3 pr-9'
														)
													}
													value={font}
												>
													{({selected, active}) => (
														<>
															<span
																className={`${
																	selected ? 'font-medium' : 'font-normal'
																} block truncate`}
															>
																{font.name}
															</span>
															{selected ? (
																<span
																	className={classnames(
																		active ? 'text-white' : 'text-indigo-600',
																		'absolute inset-y-0 right-0 flex items-center pr-4'
																	)}
																>
																	<CheckIcon
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</>
						)}
					</Listbox>
				</div>
			</React.Fragment>
		)
	}

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
								<ParagraphMenu />
								{/* {activeHighLight && (
									<button
										onClick={(color: any) =>
											editor
												.chain()
												.focus()
												.toggleHighlight({color: color.hex})
												.run()
										}
										className={
											editor.isActive('highlight', {color: color.hex})
												? 'is-active'
												: ''
										}
									>
										highlight
									</button>
								)}
								{activeColor && (
									<input
										type="color"
										onChange={(color: any) => {
											setTextColor(color.hex)
											editor
												.chain()
												.focus()
												.toggleHighlight({color: color.hex})
												.run()
										}}
										onChangeCapture={() => {
											setActiveColor(false)
										}}
									/>
								)} */}

								{/* <input
									ref={highlightRef}
									type="color"
									hidden
									id="tiz-1"
									onChange={handleChangeHighlight}
								/>

								<input
									ref={colorRef}
									type="color"
									hidden
									id="text-color-picker"
									onChange={handleChangeColor}
								/> */}
							</div>
							<div
								style={{
									padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
									margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
								}}
							>
								<EditorContent
									editor={editor}
									onChangeCapture={() =>
										setProp((props) => (props.initTextData = html))
									}
								/>
							</div>
						</>
					) : (
						<div
							className="max-w-2xl"
							dangerouslySetInnerHTML={{__html: initTextData}}
						/>
					)}
				</pre>
			</div>
		</>
	)
}

Paragraph.craft = {
	displayName: 'Paragraph',
	props: defaultProps,
	related: {
		toolbar: ParagraphSettings,
	},
}
export default Paragraph
