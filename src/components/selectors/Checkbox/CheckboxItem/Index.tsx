import React from 'react'
import {useNode} from '@craftjs/core'
import CheckboxItemSettings from './CheckboxItemSettings'

const CheckboxItem = (props) => {
	const {
		connectors: {connect},
		actions: {setProp},
	} = useNode((node) => ({
		selected: node.events.selected,
	}))
	return (
		<div ref={connect} className="relative flex items-start">
			<div className="flex items-center h-5">
				<input
					id="comments"
					aria-describedby="comments-description"
					name="comments"
					type="checkbox"
					className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
				/>
			</div>
			<div className="ml-3 text-sm flex items-center justify-between">
				<label htmlFor="comments" className="font-medium text-gray-700">
					{props.text}
				</label>
				<img
					src={props.src}
					className="rounded cursor-pointer hover:border-indigo-500 medium-icon"
				/>
			</div>
		</div>
	)
}

CheckboxItem.craft = {
	displayName: 'Choice',
	props: {
		src: '',
		text: '',
	},
	related: {
		toolbar: CheckboxItemSettings,
	},
}
export default CheckboxItem
