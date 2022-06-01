import React from 'react'
import {useHistory} from 'react-router-dom'
import Image from '../../Image/index'
import Text from '../../Text/index'

interface QuizzProps {
	href: string
}

const QuizzElement = (props: any) => {
	const {href} = props

	const history = useHistory()
	return (
		<div className="col-span-1">
			<a href={href}>
				<div>{props.linkedComponents['quizz_image']}</div>
				<div>{props.linkedComponents['text_element']}</div>
			</a>
		</div>
	)
}

export default QuizzElement
