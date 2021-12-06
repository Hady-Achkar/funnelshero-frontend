import React, {useEffect, useRef, useState} from 'react'
import Quill from 'quill'
import {useEditor, useNode} from '@craftjs/core'
import {Button} from '@mui/material'

interface ParagraphProps {
	initTextData?: string
}

const Paragraph = (props: Partial<ParagraphProps>) => {
	const {initTextData} = props
	const {
		connectors: {connect},
		setProp,
	} = useNode()
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))
	const quillRef = useRef<Quill>()
	useEffect(() => {
		quillRef.current = new Quill('#paragraph-editor', {
			theme: 'snow',
			readOnly: false,
		})
	}, [])
	const [textData, setTextData] = useState<string>()

	if (quillRef.current) {
		quillRef.current.on('text-change', function(delta, oldDelta, source) {
			//@ts-ignore
			setTextData(quillRef.current.container.firstChild.innerHTML)
		})
	}
	if (initTextData) {
		return <div dangerouslySetInnerHTML={{__html: initTextData}} />
	}
	return (
		<React.Fragment>
			<div
				id={'paragraph-editor'}
				className='group aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden'
				ref={connect}
			/>
			<Button onClick={()=>{
				console.log(textData)}
			}>
				Log me
			</Button>
		</React.Fragment>

	)
}

Paragraph.craft = {
	displayName: 'Paragraph',
	props: {
		initTextData: null,
	},
	related: {},
}
export default Paragraph
