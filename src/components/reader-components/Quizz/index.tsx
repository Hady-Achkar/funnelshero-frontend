import React from 'react'

import QuizzElement from './QuizzElement/QuizzElement'
import Container from '../Container/index'
import Text from '../Text/index'
import {ComponentLayout} from '../..'

export const QuizContainer = ({children, ...props}) => {
	return (
		<div
			title="only-buttons"
			className="w-full mt-5 grid grid-cols-2 gap-2 "
			{...props}
		>
			{children}
		</div>
	)
}

export const TextContainer = ({children, ...props}) => {
	return (
		<div title="Text-container" className="my-2 mx-4" {...props}>
			{children}
		</div>
	)
}

const defaultProps = {
	padding: ['0', '0', '0', '0'],
	margin: ['0', '0', '0', '0'],
	background: {r: 255, g: 255, b: 255, a: 1},
	color: {r: 0, g: 0, b: 0, a: 1},
	shadow: 0,
	radius: 0,
}

export const Quizz = (props: any) => {
	const {background, color, padding, margin, shadow, radius} = props

	return (
		<ComponentLayout>
			<div
				style={{
					background: `rgba(${Object.values(background)})`,
					color: `rgba(${Object.values(color)})`,
					padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
					margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
					boxShadow:
						shadow === 0
							? 'none'
							: `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
					borderRadius: `${radius}px`,
				}}
			>
				<div>{props.linkedNodes['text-container'].children}</div>

				<div className="grid grid-cols-2 gap-2">
					{props.linkedNodes['wow'].children}
				</div>
			</div>
		</ComponentLayout>
	)
}
