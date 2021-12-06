import {useEditor, useNode} from '@craftjs/core'
import {Container} from '@material-ui/core'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import {ImageSettings} from './ImageSettings'

export type ImageProps = {
	src: string
	alt?: string
}
const Image = (props: Partial<ImageProps>) => {
	const {src, alt} = props
	const {
		connectors: {connect},
		setProp,
	} = useNode()
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	return (
		<Container
			className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
			innerRef={connect}
		>
			<img
				className="object-cover pointer-events-none group-hover:opacity-75"
				src={src}
				alt={alt}
				style={{maxHeight: '100vh', width: '100%'}}
			/>
		</Container>
	)
}

Image.craft = {
	displayName: 'Image',
	props: {
		src: 'https://images.unsplash.com/photo-1613685106114-63a60f4aa467?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80',
		text: 'This is a placeholder image',
	},
	related: {toolbar: ImageSettings},
}
export default Image
