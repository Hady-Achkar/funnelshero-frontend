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
		EditorState.createEmpty(),
	)
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
			true,
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
	const handleChangeHighlight = (event: React.ChangeEvent<HTMLInputElement>) => {
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
	const handleChangeHeading = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
	}, [editor])
	const [hightLight, setHightLight] = useState<string>('#fff')
	const [textColor, setTextColor] = useState<string>('#000')
	const [activeHighLight, setActiveHighlight] = useState<boolean>(false)
	const [activeColor, setActiveColor] = useState<boolean>(false)

	const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
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
	}, [setActiveHighlight, setActiveColor])
	const handleChangeJustifyText = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		// @ts-ignore
		editor.chain().focus().setTextAlign(event.target.name).run()
	}, [editor])
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
	const handleChangeFont = useCallback((event) => {
		setFontSelected(event)
		editor.chain().focus().setFontFamily(event.name).run()
	}, [editor, setFontSelected])

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
								<div
									className='block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm'></div>
								<ButtonsGroup title=''>
									<ButtonsGroup.Item
										id='SMALL'
										onClick={setContent}
										title='Set Content'
										align='left'
										name='size'
									/>
									<ButtonsGroup.Item
										id='SMALL'
										onClick={clearContent}
										title='Clear Content'
										align='middle'
										name='size'
									/>
									<ButtonsGroup.Item
										id='SMALL'
										onClick={toggleStrike}
										title='S'
										align='middle'
										name='size'
										className={editor.isActive('strike') ? 'bg-indigo-500 line-through' : 'line-through'}
									/>
									<ButtonsGroup.Item
										id='MEDIUM'
										onClick={toggleBold}
										title='B'
										align='middle'
										name='size'
										className={editor.isActive('bold') ? 'bg-indigo-500' : ''}

									/>
									<ButtonsGroup.Item
										id='LARGE'
										onClick={toggleItalic}
										title='I'
										align='middle'
										name='size'
										className={editor.isActive('italic') ? 'bg-indigo-500' : ''}
									/>
									<ButtonsGroup.Item
										id='LARGE'
										onClick={toggleUnderline}
										title='U'
										align='middle'
										name='size'
										className={editor.isActive('underline') ? 'is-active' : ''}
									/>
									<ButtonsGroup.Item
										id='1'
										onClick={handleChangeHeading}
										title='h1'
										align='middle'
										name='size'
										className={editor.isActive('underline') ? 'is-active' : ''}
									/>
									<ButtonsGroup.Item
										id='2'
										onClick={handleChangeHeading}
										title='h2'
										align='middle'
										name='size'
										className={editor.isActive('underline') ? 'is-active' : ''}
									/>

									<ButtonsGroup.Item
										id='3'
										onClick={handleChangeHeading}
										title='h3'
										align='middle'
										name='size'
										className={editor.isActive('underline') ? 'is-active' : ''}
									/>
									<ButtonsGroup.Item
										id='highlight-color'
										onClick={handleClick}
										title='Highlight'
										align='middle'
										name='size'
										className={editor.isActive('underline') ? 'is-active' : ''}
									/>
									<ButtonsGroup.Item
										id='text-color'
										onClick={handleClick}
										title='Text Color'
										align='middle'
										name='size'
										className={editor.isActive('underline') ? 'is-active' : ''}
									/>
									<button
										type='button'
										onClick={handleChangeJustifyText}
										name={'left'}
										className={classnames(
											renderEdges('middle'),
											'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
										)}
									>
										<FormatAlignLeftIcon />
									</button>
									<button
										type='button'
										onClick={handleChangeJustifyText}
										name={'center'}
										className={classnames(
											renderEdges('middle'),
											'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
										)}
									>
										<FormatAlignCenterIcon />
									</button>
									<button
										type='button'
										onClick={handleChangeJustifyText}
										name={'right'}
										className={classnames(
											renderEdges('middle'),
											'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
										)}
									>
										<FormatAlignRightIcon />
									</button>
									<button
										type='button'
										onClick={handleChangeJustifyText}
										name={'justify'}
										className={classnames(
											renderEdges('middle'),
											'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
										)}
									>
										<FormatAlignJustifyIcon />
									</button>
									<button
										type='button'
										onClick={handleUnsetFont}
										name={'justify'}
										className={classnames(
											renderEdges('middle'),
											'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
										)}
									>
										<ClearIcon />
									</button>

									<button
										type='button'
										onClick={setLink}
										className={classnames(
											renderEdges('middle'),
											editor.isActive('link') ? 'is-active' : '',
											'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
										)}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-3 w-3'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
											/>
										</svg>
									</button>

									<button
										type='button'
										onClick={unlink}
										disabled={!editor.isActive('link')}
										className={classnames(
											renderEdges('right'),
											editor.isActive('link') ? 'is-active' : '',
											'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
										)}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-3 w-3 line-through'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
											/>
										</svg>
									</button>

								</ButtonsGroup>


								<Listbox value={fontSelected} onChange={handleChangeFont}>
									<div className='relative mt-1'>
										<Listbox.Button
											className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
											<span className='block truncate'>{fontSelected.name}</span>
											<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <SelectorIcon
								className='w-5 h-5 text-gray-400'
								aria-hidden='true'
							/>
            </span>
										</Listbox.Button>
										<Transition
											as={React.Fragment}
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<Listbox.Options
												className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
												{fonts.map((font, index) => (
													<Listbox.Option
														key={index}
														className={({active}) =>
															`${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
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
																		className={`${
																			active ? 'text-amber-600' : 'text-amber-600'
																		}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
																	>
                          <CheckIcon className='w-5 h-5' aria-hidden='true' />
                        </span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
								{activeHighLight &&
								<ChromePicker
									color={hightLight}
									onChange={(color: any) => {
										setHightLight(color.hex)
										editor.chain().focus().toggleHighlight({color: color.hex}).run()
									}}
									onChangeComplete={() => {
										setActiveHighlight(false)
									}
									}
								/>
								}
								{
									activeColor &&
									<ChromePicker
										color={textColor}
										onChange={(color: any) => {
											setTextColor(color.hex)
											editor.chain().focus().toggleHighlight({color: color.hex}).run()
										}}
										onChangeComplete={() => {
											setActiveColor(false)
										}
										}
									/>
								}

								{/*<input*/}
								{/*	ref={highlightRef}*/}
								{/*	type='color'*/}
								{/*	hidden*/}
								{/*	id='tiz-1'*/}
								{/*	onChange={handleChangeHighlight}*/}
								{/*/>*/}

								{/*<input*/}
								{/*	ref={colorRef}*/}
								{/*	type='color'*/}
								{/*	hidden*/}
								{/*	id='text-color-picker'*/}
								{/*	onChange={handleChangeColor}*/}
								{/*/>*/}
							</div>


							<div className='w-full'>
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().toggleHeading({level: 1}).run()*/}
								{/*	}*/}
								{/*>*/}
								{/*	H1*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().toggleHeading({level: 2}).run()*/}
								{/*	}*/}
								{/*>*/}
								{/*	H2*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().toggleHeading({level: 3}).run()*/}
								{/*	}*/}
								{/*>*/}
								{/*	H3*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={toggleStrike}*/}
								{/*	className={editor.isActive('strike') ? 'is-active' : ''}*/}
								{/*>*/}
								{/*	Strike*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={toggleBold}*/}
								{/*	className={editor.isActive('bold') ? 'is-active' : ''}*/}
								{/*>*/}
								{/*	Bold*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={toggleItalic}*/}
								{/*	className={editor.isActive('italic') ? 'is-active' : ''}*/}
								{/*>*/}
								{/*	Italic*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={toggleUnderline}*/}
								{/*	className={editor.isActive('italic') ? 'is-active' : ''}*/}
								{/*>*/}
								{/*	underline*/}
								{/*</button>*/}

								{/*<button*/}
								{/*	onClick={setLink}*/}
								{/*	className={editor.isActive('link') ? 'is-active' : ''}*/}
								{/*>*/}
								{/*	<svg*/}
								{/*		xmlns='http://www.w3.org/2000/svg'*/}
								{/*		className='h-3 w-3'*/}
								{/*		fill='none'*/}
								{/*		viewBox='0 0 24 24'*/}
								{/*		stroke='currentColor'*/}
								{/*	>*/}
								{/*		<path*/}
								{/*			strokeLinecap='round'*/}
								{/*			strokeLinejoin='round'*/}
								{/*			strokeWidth='2'*/}
								{/*			d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'*/}
								{/*		/>*/}
								{/*	</svg>*/}
								{/*</button>*/}
								{/*<button onClick={unlink} disabled={!editor.isActive('link')}>*/}
								{/*	unsetLink*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setFontFamily('Inter').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive('textStyle', {fontFamily: 'Inter'})*/}
								{/*			? 'is-active'*/}
								{/*			: ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	Inter*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor*/}
								{/*			.chain()*/}
								{/*			.focus()*/}
								{/*			.setFontFamily('Comic Sans MS, Comic Sans')*/}
								{/*			.run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive('textStyle', {*/}
								{/*			fontFamily: 'Comic Sans MS, Comic Sans',*/}
								{/*		})*/}
								{/*			? 'is-active'*/}
								{/*			: ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	Comic Sans*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setFontFamily('serif').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive('textStyle', {fontFamily: 'serif'})*/}
								{/*			? 'is-active'*/}
								{/*			: ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	serif*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setFontFamily('monospace').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive('textStyle', {fontFamily: 'monospace'})*/}
								{/*			? 'is-active'*/}
								{/*			: ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	monospace*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setFontFamily('cursive').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive('textStyle', {fontFamily: 'cursive'})*/}
								{/*			? 'is-active'*/}
								{/*			: ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	cursive*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() => editor.chain().focus().unsetFontFamily().run()}*/}
								{/*>*/}
								{/*	unsetFontFamily*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setTextAlign('left').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive({textAlign: 'left'}) ? 'is-active' : ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	left*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setTextAlign('center').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive({textAlign: 'center'}) ? 'is-active' : ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	center*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setTextAlign('right').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive({textAlign: 'right'}) ? 'is-active' : ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	right*/}
								{/*</button>*/}
								{/*<button*/}
								{/*	onClick={() =>*/}
								{/*		editor.chain().focus().setTextAlign('justify').run()*/}
								{/*	}*/}
								{/*	className={*/}
								{/*		editor.isActive({textAlign: 'justify'}) ? 'is-active' : ''*/}
								{/*	}*/}
								{/*>*/}
								{/*	justify*/}
								{/*</button>*/}
							</div>
							<EditorContent
								editor={editor}
								onChangeCapture={() =>
									setProp((props) => (props.initTextData = html))
								}
							/>
						</>
					) : (
						<div dangerouslySetInnerHTML={{__html: initTextData}} />
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
