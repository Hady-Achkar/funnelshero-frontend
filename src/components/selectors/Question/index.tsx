import React from 'react'
import {useNode, useEditor, Element} from '@craftjs/core'
import Text from '../Text'
import QuestionSettings from './QuestionSettings'

const defaultProps = {
	question: 'Did you like our product?',
	placeholder: 'Type your answer here..',
}
const Question = (props) => {
	const {
		connectors: {connect},
	} = useNode()

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	return (
		<div ref={connect} className="w-full p-3 shadow-md my-5">
			<p style={{fontSize: '14px', textAlign: 'center'}}>{props.question}</p>
			<div className="mt-1 mb-5 border-b border-gray-300 focus-within:border-black">
				<textarea
					rows={4}
					name="name"
					id="name"
					disabled={enabled}
					className="block w-full border-0 border-b border-transparent  focus:border-black focus:ring-0 sm:text-sm"
					placeholder={props.placeholder}
				/>
			</div>
		</div>
	)
}

Question.craft = {
	displayName: 'Question Box',
	props: defaultProps,
	related: {toolbar: QuestionSettings},
}

export default Question
