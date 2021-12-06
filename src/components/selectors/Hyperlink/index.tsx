import {useEditor, useNode} from '@craftjs/core'
import {Container} from '@material-ui/core'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import {LinkSettings} from './LinkSettings'

const Hyperlink = ({href, text}) => {
	const {
		connectors: {connect},
		setProp,
	} = useNode()
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	return (
		<Container>
			<a
				target={enabled && '_blank'}
				href={!enabled && 'https://www.google.com'}
			>
				{text}
			</a>
		</Container>
	)
}

Hyperlink.craft = {
	displayName: 'Link',
	props: {
		href: 'https://www.google.com',
		text: 'Go to google',
	},
	related: {toolbar: LinkSettings},
}
export default Hyperlink
