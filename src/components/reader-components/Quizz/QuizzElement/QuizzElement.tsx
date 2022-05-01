import React from 'react'
import {useHistory} from 'react-router-dom'
import Image from '../../Image/index'
import Text from '../../Text/index'

interface QuizzProps {
	href: string
}

const QuizzElement = (props: Partial<QuizzProps>) => {
	const {href} = props

	const history = useHistory()
	return (
		<div className="p-2 ">
			<div onClick={() => history.push(href)}>
				<Image width="200px" />
			</div>
			<Text />
		</div>
	)
}

export default QuizzElement
