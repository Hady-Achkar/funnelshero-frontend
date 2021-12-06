import React from 'react'
import {useEditor, useNode} from '@craftjs/core'
import ParagraphSettings from './Paragraph.Settings'

interface ParagraphProps {
	initTextData?: string
}

const Paragraph = (props: Partial<ParagraphProps>) => {
	const {initTextData} = props
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

		const {
			connectors: {connect},
		} = useNode()
	return (
		<div ref={connect} dangerouslySetInnerHTML={{__html: initTextData}} style={{height: '10vh'}} />
	)
}

Paragraph.craft = {
	displayName: 'Paragraph',
	props: {
		initTextData: null,
	},
	related: {toolbar: ParagraphSettings},

}
export default Paragraph
