import React from 'react'
import {useHistory} from 'react-router-dom'
import {Element, useEditor, useNode} from '@craftjs/core'
import Image from '../../Image/index'
import Text from '../../Text/index'
import QuizzElementSettings from './QuizzElementSettings'

interface QuizzProps {
	href: string
}

const QuizzElement = (props: any) => {
	const {href} = props

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	const {
		connectors: {connect},
	} = useNode()

	const history = useHistory()
	return (
		<div
			style={{backgroundColor: '#f5f5f5'}}
			ref={connect}
			className="p-3 rounded-lg"
		>
			<Element
				is={Image}
				width="100%"
				height="250px"
				id="quizz_image"
				radius={15}
			/>
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
