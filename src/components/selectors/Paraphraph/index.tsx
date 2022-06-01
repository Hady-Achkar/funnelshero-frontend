import React, {useEffect, useState} from 'react'
import {ContentState, convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import htmlToDraft from 'html-to-draftjs'
import {useNode} from '@craftjs/core'

const Paragraph = (props) => {
	const {
		connectors: {connect},
		setProp,
	} = useNode()
	const data = '<p>Hello world</p>'

	const contentBlock = htmlToDraft(data)
	const contentState = ContentState.createFromBlockArray(
		contentBlock.contentBlocks
	)
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createWithContent(contentState)
	)

	return (
		<div ref={connect}>
			<Editor
				editorState={editorState}
				toolbarClassName="toolbarClassName"
				wrapperClassName="border"
				editorClassName="editorClassName"
				onEditorStateChange={(newState) => {
					setEditorState(newState)
					setProp(
						(prop) =>
							(prop.html = draftToHtml(
								convertToRaw(newState.getCurrentContent())
							))
					)
				}}
			/>
		</div>
	)
}
Paragraph.craft = {
	displayName: 'Paragraph',
	props: {html: '<p>Hello world</p>'},
}

export default Paragraph
