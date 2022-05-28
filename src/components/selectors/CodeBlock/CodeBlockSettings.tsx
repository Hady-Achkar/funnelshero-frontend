import {useEditor, useNode} from '@craftjs/core'
import React, {useCallback} from 'react'
import {capitalize, weightDescription} from '../../../utils'
import {ToolbarSection, ToolbarItem, ToolbarRadio} from '../../editor'
import {ButtonsGroup} from '../../editor'
const CodeBlockSettings = () => {
	const {
		actions: {setProp},
	} = useNode()

	return (
		<React.Fragment>
			<div className="mt-1">
				<textarea
					rows={4}
					onChange={(e) => setProp((props) => (props.html = e.target.value))}
					name="comment"
					id="comment"
					className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
					defaultValue={''}
				/>
			</div>
		</React.Fragment>
	)
}

export default CodeBlockSettings
