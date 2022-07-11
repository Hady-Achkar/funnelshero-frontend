import React from 'react'
import {Element, useNode} from '@craftjs/core'
import CheckboxItem from './CheckboxItem/Index'

const CheckboxComponent = () => {
	const {
		connectors: {connect},
		actions: {setProp},
	} = useNode((node) => ({
		selected: node.events.selected,
	}))
	return (
		<fieldset className="border-t border-b border-gray-200">
			<div className="divide-y divide-gray-200">
				<Element is={CheckboxItem} id="cb_1" />
				<Element is={CheckboxItem} id="cb_2" />
				<Element is={CheckboxItem} id="cb_3" />
				<Element is={CheckboxItem} id="cb_4" />
			</div>
		</fieldset>
	)
}

CheckboxComponent.craft = {
	displayName: 'List',
}
export default CheckboxComponent
