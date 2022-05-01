import React from 'react'
import {Container} from '@material-ui/core'

const Hyperlink = ({href, text}) => {
	return (
		<Container>
			<a href={href}>{text}</a>
		</Container>
	)
}

export default Hyperlink
