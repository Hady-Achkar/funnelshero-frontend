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
		<fieldset ref={connect}>
			<div className="space-y-6 my-5">
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
