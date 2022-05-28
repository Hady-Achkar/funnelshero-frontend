import {useNode} from '@craftjs/core'
import {Divider, Grid} from '@material-ui/core'
import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {AppState} from '../../../reducers'
import {ToolbarItem, ButtonsGroup} from '../../editor'
import {useParams} from 'react-router-dom'
export const ButtonSettings = () => {
	const {
		actions: {setProp},
	} = useNode()
	const handleChange = useCallback(
		(e) => {
			setProp((innerProps) => {
				innerProps[e.target.name] = e.target.id
			})
		},
		[setProp]
	)

	const {funnels} = useSelector((state: AppState) => state.funnels)
	const {funnelTitle} = useParams()
	const mainFunnel = funnels.find((f) => f.title === funnelTitle)

	return (
		<React.Fragment>
			<div className="px-6 w-full">
				<Grid container direction="row" alignItems="center" spacing={3}>
					<Grid item xs={4}>
						<h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
							Colors
						</h5>
					</Grid>
					<div style={{padding: '0px 24px 20px'}}>
						<Grid container spacing={1}>
							<ToolbarItem
								full={true}
								propKey="background"
								type="bg"
								label="Background"
							/>
							<ToolbarItem
								full={true}
								propKey="text"
								type="text"
								label="Button Text"
							/>
							<ToolbarItem
								full={true}
								propKey="color"
								type="color"
								label="Text"
							/>
							<select
								onChange={(e) =>
									setProp((prop) => (prop.href = e.target.value))
								}
								name="href"
							>
								{mainFunnel?.pages.map((item) => {
									return (
										<option key={item?._id} value={item?.link}>
											{item?.title}
										</option>
									)
								})}
							</select>
						</Grid>
					</div>
				</Grid>
			</div>

			<ButtonsGroup title="Size">
				<ButtonsGroup.Item
					id="SMALL"
					onClick={handleChange}
					title="S"
					align="left"
					name="size"
				/>
				<ButtonsGroup.Item
					id="MEDIUM"
					onClick={handleChange}
					title="M"
					align="middle"
					name="size"
				/>
				<ButtonsGroup.Item
					id="LARGE"
					onClick={handleChange}
					title="L"
					align="right"
					name="size"
				/>
			</ButtonsGroup>

			<ButtonsGroup title="Variants">
				<ButtonsGroup.Item
					id="OUTLINED"
					onClick={handleChange}
					title="Outlined"
					align="left"
					name="variant"
				/>
				<ButtonsGroup.Item
					id="FILLED"
					onClick={handleChange}
					title="Filled"
					align="middle"
					name="variant"
				/>
				<ButtonsGroup.Item
					id="LIGHT"
					onClick={handleChange}
					title="Light"
					align="right"
					name="variant"
				/>
			</ButtonsGroup>
		</React.Fragment>
	)
}
