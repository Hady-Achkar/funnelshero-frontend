import {useEditor, useNode} from '@craftjs/core'
import React, {useCallback} from 'react'
import {capitalize, weightDescription} from '../../../utils'
import {ToolbarSection, ToolbarItem, ToolbarRadio} from '../../editor'
import {ButtonsGroup} from '../../editor'
export const TextSettings = () => {
	const {
		actions: {setProp},
	} = useNode()
	function SwitchTypeButton() {
		const {id} = useNode()
		const {actions, query} = useEditor()
		return (
			<button
				onClick={() => {
					const nodeData = query.node(id).toSerializedNode()
					const parentNode = query.node(nodeData.parent).get()
					const index = parentNode.data.nodes.indexOf(id)
					nodeData.displayName = 'Hyperlink'
					nodeData.type = {resolvedName: 'Hyperlink'}
					const newNode = query.parseSerializedNode(nodeData).toNode()
					actions.delete(id)
					actions.add(newNode, nodeData.parent, index)
				}}
			>
				Test
			</button>
		)
	}

	const EditButton = (props) => {
		return (
			<button
				key={props.cmd}
				onMouseDown={(evt) => {
					evt.preventDefault() // Avoids loosing focus from the editable area
					document.execCommand(props.cmd, false, props.arg) // Send the command to the browser
				}}
			>
				{props.name || props.cmd}
			</button>
		)
	}
	const handleChange = useCallback(
		(event) => {
			setProp((innerProps: any) => {
				innerProps[event.target.name] = event.target.id
			})
		},
		[setProp]
	)

	return (
		<React.Fragment>
			<ToolbarSection
				title="Typography"
				props={['fontSize', 'fontWeight', 'textAlign', 'textDecoration']}
				summary={({fontSize, fontWeight, textAlign, color}: any) => {
					return `${fontSize || ''}, ${color || ''}, ${weightDescription(
						fontWeight
					)}, ${capitalize(textAlign)}`
				}}
			>
				<ToolbarItem
					full={true}
					propKey="fontSize"
					type="slider"
					label="Font Size"
				/>
				<ButtonsGroup title="Align">
					<ButtonsGroup.Item
						onClick={handleChange}
						id="left"
						align="left"
						title="Left"
						name="textAlign"
					/>
					<ButtonsGroup.Item
						onClick={handleChange}
						id="center"
						align="middle"
						title="Center"
						name="textAlign"
					/>
					<ButtonsGroup.Item
						onClick={handleChange}
						id="right"
						align="right"
						title="Right"
						name="textAlign"
					/>
				</ButtonsGroup>

				<ButtonsGroup title="Weight">
					<ButtonsGroup.Item
						onClick={handleChange}
						id="400"
						align="left"
						title="Regular"
						name="fontWeight"
					/>
					<ButtonsGroup.Item
						onClick={handleChange}
						id="600"
						align="middle"
						title="Medium"
						name="fontWeight"
					/>
					<ButtonsGroup.Item
						onClick={handleChange}
						id="700"
						align="right"
						title="Bold"
						name="fontWeight"
					/>
				</ButtonsGroup>

				<ButtonsGroup title="Text types">
					<ButtonsGroup.Item
						onClick={handleChange}
						id="underline"
						align="left"
						title="Underline"
						name="textDecoration"
					/>
					<ButtonsGroup.Item
						onClick={handleChange}
						id="line-through"
						align="middle"
						title="Strike"
						name="textDecoration"
					/>
					<ButtonsGroup.Item
						onClick={handleChange}
						id="none"
						align="right"
						title="Normal"
						name="textDecoration"
					/>
				</ButtonsGroup>
				{/* <ToolbarItem propKey="textDecoration" type="radio" label="Text types">
					<ToolbarRadio value="underline" label="Underline" />
					<ToolbarRadio value="line-through" label="strike" />
				</ToolbarItem> */}
			</ToolbarSection>

			<ToolbarSection
				title="Appearance"
				props={['color', 'shadow']}
				summary={({color, shadow}: any) => {
					return (
						<div className="fletext-right">
							<p
								style={{
									color: color && `rgba(${Object.values(color)})`,
									textShadow: `0px 0px 2px rgba(0, 0, 0, ${shadow / 100})`,
								}}
								className="text-white text-right"
							>
								Text
							</p>
						</div>
					)
				}}
			>
				<ToolbarItem full={true} propKey="color" type="color" label="Text" />
				<ToolbarItem
					full={true}
					propKey="shadow"
					type="slider"
					label="Shadow"
				/>
			</ToolbarSection>
		</React.Fragment>
	)
}
