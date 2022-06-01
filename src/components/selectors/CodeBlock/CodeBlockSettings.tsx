import {useEditor, useNode} from '@craftjs/core'
import React, {useCallback} from 'react'
import {capitalize, weightDescription} from '../../../utils'
import {ToolbarSection, ToolbarItem, ToolbarRadio} from '../../editor'
import {ButtonsGroup} from '../../editor'
const CodeBlockSettings = (props) => {
	const {
		actions: {setProp},
	} = useNode()

	return (
		<React.Fragment>
			<div className="mt-1 p-2">
				<h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
					Embed Code
				</h5>
				<ToolbarItem type="textarea" propKey="html" />
			</div>
		</React.Fragment>
	)
}

export default CodeBlockSettings
