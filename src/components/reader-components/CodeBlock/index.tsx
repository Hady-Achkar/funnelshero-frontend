import React from 'react'

const CodeBlockComponent = (props: any) => {
	return <div dangerouslySetInnerHTML={{__html: props.html}} />
}

export default CodeBlockComponent
