import React from 'react'
import {ToolbarSection, ToolbarItem} from '../../editor'
import {ToolbarRadio} from '../../editor'

const ParagraphSettings = () => {
	return (
		<div className="px-2">
			<label className="text-sm font-medium text-gray-500" htmlFor="language">
				Language
			</label>
			<ToolbarItem type="select" propKey="language">
				<option value="english">English</option>
				<option value="arabic">Arabic</option>
			</ToolbarItem>
		</div>
	)
}

export default ParagraphSettings
