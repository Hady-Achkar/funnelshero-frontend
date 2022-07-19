import React from 'react'
import {Element, useNode} from '@craftjs/core'
import CheckboxItemSettings from './CheckboxItemSettings'
import {Text} from '../../../selectors'

const CheckboxItem = (props) => {
	const {
		connectors: {connect},
		actions: {setProp},
	} = useNode((node) => ({
		selected: node.events.selected,
	}))
	return (
		<div
			ref={connect}
			className="relative flex items-center justify-between py-4 px-8 rounded-full border border-gray-200 mx-4"
		>
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
				<Element is={Text} id="cb_title" text="Cool stuff here!" />
			</div>
			<img
				src={props.src}
				className="rounded cursor-pointer hover:border-indigo-500 large-icon"
			/>
		</div>
	)
}

CheckboxItem.craft = {
	displayName: 'Choice',
	props: {
		src: 'https://cdn-icons-png.flaticon.com/128/1384/1384015.png',
		text: '',
	},
	related: {
		toolbar: CheckboxItemSettings,
	},
}
export default CheckboxItem
