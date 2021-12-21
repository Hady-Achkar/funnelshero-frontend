import React from 'react'
import {useHistory} from 'react-router-dom'
import {Element, useEditor, useNode} from '@craftjs/core'
import Container from '../../Container'
import Image from '../../Image/index'
import Text from '../../Text/index'
import QuizzElementSettings from './QuizzElementSettings'
import ContentEditable from 'react-contenteditable'

interface QuizzProps {
	href: string
}

const QuizzElement = (props: Partial<QuizzProps>) => {
	const {href} = props

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	const {
		connectors: {connect},
	} = useNode()

	const history = useHistory()
	return (
		<div ref={connect} className="p-2 ">
			<div onClick={() => !enabled && history.push(href)}>
				<Element is={Image} width="200px" id="quizz_image" />
			</div>
			<Element is={Text} id="text_element" />
		</div>
	)
}

QuizzElement.craft = {
	displayName: 'Quiz Element',
	props: {
		href: '',
	},
	related: {toolbar: QuizzElementSettings},
}

export default QuizzElement
