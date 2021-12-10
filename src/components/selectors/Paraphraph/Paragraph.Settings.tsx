import React, {useEffect, useRef} from 'react'
import Quill from 'quill'
import {useNode} from '@craftjs/core'


const ParagraphSettings = () => {
	const {
		setProp,
	} = useNode()
	const quillRef = useRef<Quill>()
	useEffect(() => {
const quill= new Quill('#paragraph-editor', {
			theme: 'snow',
			readOnly: false,
		})
		quill.on('text-change', function(delta, oldDelta, source) {
			setProp((innerProps) => {
				//@ts-ignore
				innerProps['initTextData'] = quillRef.current.container.firstChild.innerHTML
			})
			//@ts-ignore
			console.log(quillRef.current.container.firstChild.innerHTML)
		})
		quillRef.current=quill
	}, [])

	return (
		<React.Fragment>
			<div
				id={'paragraph-editor'}
				className='group aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden'
			/>
		</React.Fragment>

	)
}

export default ParagraphSettings
