import React from 'react'
import {ToolbarItem, ToolbarSection} from '../../editor'

const QuestionSettings = (props) => {
	return (
		<ToolbarSection title="Settings">
			<label htmlFor="question">Add a question</label>
			<ToolbarItem propKey="question" label="Question" type="textarea" />
			<ToolbarItem propKey="placeholder" label="Placeholder" type="text" />
		</ToolbarSection>
	)
}

export default QuestionSettings
