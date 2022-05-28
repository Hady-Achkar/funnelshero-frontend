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
		<div className="w-full flex  justify-center">
			<div ref={connect} dangerouslySetInnerHTML={{__html: html}} />
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
