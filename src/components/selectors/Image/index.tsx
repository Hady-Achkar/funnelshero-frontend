import {useEditor, useNode, Element} from '@craftjs/core'
import React from 'react'
import ContentEditable from 'react-contenteditable'
import Container from '../Container'
import {ImageSettings} from './ImageSettings'
import {ContainerSettings} from '../Container/ContainerSettings'

export type ImageProps = {
	src: string
	alt?: string
}

export const ImageContainer = ({children, ...props}) => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<div
			title="only-buttons"
			ref={connect}
			className="w-full mt-5 grid grid-cols-2 gap-2 p-3 bg-gray-600"
			{...props}
		>
			{children}
		</div>
	)
}

ImageContainer.craft = {
	rules: {
		canMoveIn: (nodes) => nodes.every((node) => node.data.type === Image),
	},
	related: {
		ContainerSettings,
	},
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
		<div className="m-2" ref={connect}>
			<img
				className="object-cover  group-hover:opacity-75 p-4"
				src={src}
				alt={alt}
				// style={{maxHeight: '100vh', width: '100%'}}
			/>
		</div>
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
