import React from 'react'
import {Element, useNode} from '@craftjs/core'
import CheckboxItem from './CheckboxItem/Index'

export const CheckboxContainer = ({children, ...props}) => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<div
			title="Checkbox Container"
			ref={connect}
			className="space-y-6 my-5"
			{...props}
		>
			{children}
		</div>
	)
}
CheckboxContainer.craft = {
	displayName: 'Checkbox Container',
}
const CheckboxComponent = () => {
	const {
		connectors: {connect},
		actions: {setProp},
	} = useNode((node) => ({
		selected: node.events.selected,
	}))
	return (
		<fieldset ref={connect}>
			<Element is={CheckboxContainer} canvas id="checkbox_container">
				<Element
					is={CheckboxItem}
					id="cb_1"
					src="https://cdn-icons-png.flaticon.com/128/174/174848.png"
				/>
				<Element
					is={CheckboxItem}
					id="cb_2"
					src="https://cdn-icons-png.flaticon.com/128/1409/1409946.png"
				/>
				<Element
					is={CheckboxItem}
					id="cb_3"
					src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
				/>
				<Element
					is={CheckboxItem}
					id="cb_4"
					src="https://cdn-icons-png.flaticon.com/128/3046/3046121.png"
				/>
			</Element>
		</fieldset>
	)
}

CheckboxComponent.craft = {
	displayName: 'List',
}
export default CheckboxComponent
