//@ts-nocheck
import React, {Fragment} from 'react'

import {
	Container,
	Text,
	Button,
	Video,
	HyperLink,
	Image,
	Divider,
	Quizz,
	QuizzElement,
	QuizContainer,
	OptinForm,
	InputComponent,
	TextContainer,
	IconsContainer,
	Icon,
	FooterComponent,
	HeaderComponent,
	Paragraph,
} from '../reader-components'

const contentElements = {
	Container,
	Text,
	Image,
	Button,
	Video,
	HyperLink,
	Divider,
	Quizz,
	QuizzElement,
	QuizContainer,
	OptinForm,
	Fragment,
	HeaderComponent,
	FooterComponent,
	Icon,
	IconsContainer,
	TextContainer,
	InputComponent,
	Paragraph,
}

function createElementFromNode({
	key,
	id,
	type,
	childNodes,
	linkedNodes,
	linkedComponents,
	children,
	props,
}) {
	if (contentElements[type] === undefined) {
		throw `Component "${type}" does not exist`
	}
	// eslint-disable-next-line react/no-children-prop
	return React.createElement(contentElements[type], {
		key,
		id,
		linkedNodes,
		childNodes,
		linkedComponents,
		children,
		...props,
	})
}

function getNode(nodes, id) {
	const node = nodes[id]
	const childNodes = node.nodes
		? node.nodes.map((_id) => getNode(nodes, _id))
		: []
	const linkedNodes = node.linkedNodes
		? Object.fromEntries(
				Object.entries(node.linkedNodes).map(([linkId, _id]) => [
					linkId,
					getNode(nodes, _id),
				])
		  )
		: {}
	return {
		id,
		type: node.type.resolvedName,
		props: node.props,
		childNodes,
		linkedNodes,
		children: childNodes.map((node) =>
			createElementFromNode({...node, key: node.id})
		),
		linkedComponents: Object.fromEntries(
			Object.entries(linkedNodes).map(([linkId, node]) => [
				linkId,
				createElementFromNode({...node, key: linkId}),
			])
		),
	}
}

const Reader = ({json}) => {
	const content = JSON.parse(json)
	if (content && content.ROOT) {
		const root = getNode(content, 'ROOT')
		return <div>{root.children}</div>
	}
	return <div>no content</div>
}
export default Reader
