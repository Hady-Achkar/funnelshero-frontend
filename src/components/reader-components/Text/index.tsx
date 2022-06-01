import {Container} from '@material-ui/core'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import {ComponentLayout} from '../..'

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
	shadow,
	text,
	href,
}: Partial<TextProps>) => {
	return (
		<ComponentLayout>
			<Container className="w-full">
				<ContentEditable
					html={text} // innerHTML of the editable div
					disabled={true}
					onChange={(e) => {}} // use true to disable editing
					tagName="h2" // Use a custom HTML tag (uses a div by default)
					style={{
						width: '100%',
						fontSize: `${fontSize}px`,
						textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
						fontWeight,
						textAlign,
						textDecoration: textDecoration,
						href: href,
					}}
				/>
			</Container>
		</ComponentLayout>
	)
}

export default Text
