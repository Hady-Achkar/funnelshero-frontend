import {Element, useNode} from '@craftjs/core'
import React from 'react'

import QuizzElement from './QuizzElement/QuizzElement'
import Container from '../Container/index'
import Text from '../Text/index'
import {ContainerSettings} from '../Container/ContainerSettings'

export const QuizContainer = ({children, ...props}) => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<div
			title="only-buttons"
			ref={connect}
			className="w-full mt-5 grid grid-cols-2 gap-2 "
			{...props}
		>
			{children}
		</div>
	)
}

QuizContainer.craft = {
	displayName: 'cantainar',
	rules: {
		canMoveIn: (nodes) =>
			nodes.every((node) => node.data.type === QuizzElement),
	},
}

export const Quizz = (props: any) => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<div ref={connect} className="w-full">
			<Element id="quiz_title" is={Text} />
			<Element canvas id="wow" is={QuizContainer}>
				<QuizzElement />
				<QuizzElement />
				<QuizzElement />
				<QuizzElement />
			</Element>
		</div>
	)
}

Quizz.craft = {
	displayName: 'Quiz',
}
