import {useNode} from '@craftjs/core'
import {Divider, Grid} from '@material-ui/core'
import React, {Fragment, useCallback, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppState} from '../../../reducers'
import {ToolbarItem, ButtonsGroup, ToolbarDropdown} from '../../editor'
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
	const [checked, setChecked] = useState(false)

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
						</Grid>
					</div>
				</Grid>
			</div>

			<div className="px-2 w-full">
				<h5 className="text-sm text-light-gray-1 py-1 text-left font-medium text-dark-gray">
					Go to
				</h5>
				<div className="relative flex items-start">
					<div className="flex items-center h-5">
						<input
							onChange={(e) => setChecked(e.target.checked)}
							checked={checked}
							type="checkbox"
							className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div className="ml-3 text-sm">
						<label htmlFor="link" className="font-medium text-gray-700">
							External Link
						</label>
					</div>
				</div>
				<div className="py-2">
					{checked ? (
						<Fragment>
							<label className="text-gray-500 text-xs">
								make sure to include the full link ex:https://www.google.com
								<br />
							</label>
							<ToolbarItem type="text" propKey="href" full={true} />
						</Fragment>
					) : (
						<div>
							<ToolbarItem full={true} type="select" propKey="href">
								{mainFunnel?.pages.map((item) => {
									return (
										<option key={item?._id} value={item?.link}>
											{item?.title}
										</option>
									)
								})}
							</ToolbarItem>
						</div>
					)}
				</div>
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
