import {Container} from '@material-ui/core'
import React from 'react'
import ContentEditable from 'react-contenteditable'

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
	return (
		<Container className="w-full m-2">
			<ContentEditable
				html={text} // innerHTML of the editable div
				disabled={true}
				onChange={(e) => {}} // use true to disable editing
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

export default Text
