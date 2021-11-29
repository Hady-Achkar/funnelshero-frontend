import React from 'react'
import {useNode} from '@craftjs/core'
import DividerSettings from './DividerSettings'
import {Container, Divider as MuiDivider} from '@material-ui/core'
export type DividerProps = {
	marginVertical?: string[]
	thick?: boolean
}
const Divider = (props: Partial<DividerProps>) => {
	const {marginVertical, thick} = props
	const {
		connectors: {connect},
	} = useNode()
	return (
		<Container className="w-full">
			<MuiDivider
				innerRef={connect}
				variant="middle"
				style={{
					marginTop: marginVertical[0],
					marginBottom: marginVertical[1],
					height: thick ? '2px' : '1px',
				}}
				className="rounded"
			/>
		</Container>
	)
}
Divider.craft = {
	props: {
		marginVertical: ['20px', '20px'],
		thick: true,
	},
	related: {
		toolbar: DividerSettings,
	},
}
export default Divider
