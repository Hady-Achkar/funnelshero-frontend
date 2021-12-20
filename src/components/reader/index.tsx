import React from 'react'
import {
	Container,
	Text,
	Button,
	Video,
	HyperLink,
	Image,
	Divider,
	Paragraph,
	Quizz,
	QuizzElement,
	QuizContainer,
	OptinForm,
} from '../selectors'
const contentElements = {
	Container,
	Text,
	Image,
	Button,
	Video,
	HyperLink,
	Divider,
	Paragraph,
	Quizz,
	QuizzElement,
	QuizContainer,
	OptinForm,
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
		children: childNodes.map(
			({id: key, type, childNodes, linkedNodes, children, props}) => {
				if (contentElements[type] === undefined) {
					throw `Component "${type}" does not exist`
				}
				// eslint-disable-next-line react/no-children-prop
				return React.createElement(contentElements[type], {
					key,
					id: key,
					linkedNodes,
					children,
					...props,
				})
			}
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
