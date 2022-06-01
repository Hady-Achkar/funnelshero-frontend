import {UserComponent, useNode, useEditor} from '@craftjs/core'
import cx from 'classnames'
import React from 'react'
import Text from '../Text'
import ContentEditable from 'react-contenteditable'
import {Container} from '@material-ui/core'
import CodeBlockSettings from './CodeBlockSettings'

export type CodeBlockProps = {
	html: string
}

const CodeBlock = (props: Partial<CodeBlockProps>) => {
	const {
		connectors: {connect},
	} = useNode((node) => ({
		selected: node.events.selected,
	}))

	const {html} = props

	return (
		<div className="w-full flex  justify-center" ref={connect}>
			<div
				className="w-full flex items-center justify-center bg-indigo-100"
				style={{height: '100px'}}
			>
				Custom HTML here, click to preview.
			</div>
		</div>
	)
}

CodeBlock.craft = {
	displayName: 'Code Block',
	props: {
		html: '<p>Embed HTML!</p>',
	},
	related: {
		toolbar: CodeBlockSettings,
	},
}
export default CodeBlock
