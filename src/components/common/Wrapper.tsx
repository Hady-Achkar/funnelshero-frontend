import React from 'react'
import {Box, CircularProgress, Container} from '@material-ui/core'
interface IProps {
	loading?: boolean
	children?: React.ReactNode
}
const Wrapper: React.FC<IProps> = ({loading, children}, restProp) => {
	if (loading) {
		return (
			<Container
				maxWidth="xl"
				className=" justify-center items-center h-screen
				"
				style={{
					display: 'flex',
				}}
			>
				<CircularProgress />
			</Container>
		)
	}
	return (
		<Container
			maxWidth="xl"
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
