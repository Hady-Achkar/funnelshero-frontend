import React, {useContext} from 'react'
import classnames from 'classnames'
import {Box, CircularProgress, Container} from '@material-ui/core'
interface IProps {
	loading?: boolean
	children?: React.ReactNode
}
const Wrapper: React.FC<IProps> = ({loading, children}, restProp) => {
	if (loading) {
		return (
			<Container>
				<Box sx={{display: 'flex'}}>
					<CircularProgress />
				</Box>
			</Container>
		)
	}
	return (
		<Container
			fluid
			{...restProp}
			style={{
				margin: 0,
				padding: 0,
			}}
		>
			{children}
		</Container>
	)
}

export default Wrapper
