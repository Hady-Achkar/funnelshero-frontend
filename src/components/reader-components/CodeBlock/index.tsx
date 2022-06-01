import React from 'react'
import {ComponentLayout} from '../..'

const CodeBlockComponent = (props: any) => {
	return (
		<ComponentLayout>
			<div dangerouslySetInnerHTML={{__html: props.html}} />
		</ComponentLayout>
	)
}

export default CodeBlockComponent
