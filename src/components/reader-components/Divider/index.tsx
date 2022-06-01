import React from 'react'
import {Container, Divider as MuiDivider} from '@material-ui/core'
import {ComponentLayout} from '../..'
export type DividerProps = {
	marginVertical?: string[]
	thick?: boolean
}
const Divider = (props: Partial<DividerProps>) => {
	const {marginVertical, thick} = props

	return (
		<ComponentLayout>
			<Container className="w-full">
				<MuiDivider
					variant="middle"
					style={{
						marginTop: marginVertical[0],
						marginBottom: marginVertical[1],
						height: thick ? '2px' : '1px',
					}}
					className="rounded"
				/>
			</Container>
		</ComponentLayout>
	)
}

export default Divider
