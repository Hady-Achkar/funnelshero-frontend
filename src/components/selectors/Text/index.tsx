import {useNode, useEditor} from '@craftjs/core'
import {Container} from '@material-ui/core'
import React from 'react'
import ContentEditable from 'react-contenteditable'

import {TextSettings} from './TextSettings'

export type TextProps = {
	fontSize: string
	textAlign: string
	fontWeight: string
	color: Record<'r' | 'g' | 'b' | 'a', string>
	shadow: number
	text: string
	margin: [string, string, string, string]
	textDecoration: 'underline' | 'line-through'
	href: string
}

const Text = ({
	fontSize,
	textAlign,
	fontWeight,
	textDecoration,
	color,
	shadow,
	text,
	margin,
	href,
}: Partial<TextProps>) => {
	const {
		connectors: {connect},
		setProp,
	} = useNode()
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	return (
		<Container className="w-full m-2">
			<ContentEditable
				innerRef={connect}
				html={text} // innerHTML of the editable div
				disabled={!enabled}
				onChange={(e) => {
					setProp((prop) => (prop.text = e.target.value), 500)
				}} // use true to disable editing
				tagName="h2" // Use a custom HTML tag (uses a div by default)
				style={{
					width: '100%',
					margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
					color: `rgba(${Object.values(color)})`,
					fontSize: `${fontSize}px`,
					textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
					fontWeight,
					textAlign,
					textDecoration: textDecoration,
					href: href,
				}}
			/>
		</Container>
	)
}

Text.craft = {
	displayName: 'Text',
	props: {
		fontSize: '14',
		textAlign: 'center',
		fontWeight: '500',
		color: {r: 17, g: 24, b: 39, a: 1},
		margin: [0, 0, 0, 0],
		shadow: 0,
		text: 'Title',
		textDecoration: '',
	},
	related: {
		toolbar: TextSettings,
	},
}
export default Text
