import React, {useState} from 'react'

import {ToolbarItem} from '../../editor'

export const VideoSettings = () => {
	const platforms = [
		{id: 'youtube', title: 'Youtube'},
		{id: 'vimeo', title: 'Vimeo'},
	]

	return (
		<React.Fragment>
			<div className="px-2">
				<ToolbarItem
					full={true}
					propKey="videoId"
					type="text"
					label="Video Link"
				/>
				<label className="text-sm text-gray-500">Platform</label>
				<ToolbarItem type="select" full={true} propKey="type">
					<option value="youtube">Youtube</option>
					<option value="vimeo">Vimeo</option>
				</ToolbarItem>
			</div>
		</React.Fragment>
	)
}
