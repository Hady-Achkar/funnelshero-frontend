import {ToolbarItem, ToolbarSection} from '../../editor'
import React from 'react'

export const LinkSettings = () => {
	return (
		<React.Fragment>
			<ToolbarSection title="Link">
				<ToolbarItem full={true} propKey="href" type="text" label="Link URL" />
				<ToolbarItem full={true} propKey="text" type="text" label="Text" />
			</ToolbarSection>
		</React.Fragment>
	)
}
