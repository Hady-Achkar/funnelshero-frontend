//@ts-nocheck
import {useNode, useEditor} from '@craftjs/core'
import {ROOT_NODE} from '@craftjs/utils'
import {TrashIcon, DuplicateIcon} from '@heroicons/react/solid'
import {ArrowCircleUp} from '@mui/icons-material'
import React, {useEffect, useRef, useCallback} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Delete from '../../assets/icons/delete-svgrepo-com.svg'
import Move from '../../assets/icons/move-svgrepo-com.svg'

const IndicatorDiv = styled.div`
	height: 30px;
	margin-top: -29px;
	font-size: 12px;
	line-height: 12px;

	svg {
		fill: #fff;
		width: 15px;
		height: 15px;
	}
`

const Btn = styled.a`
	padding: 0 0px;
	opacity: 0.9;
	display: flex;
	align-items: center;
	> div {
		position: relative;
		top: -50%;
		left: -50%;
	}
`

const RenderNode = ({render}) => {
	const {id} = useNode()
	const {enabled, actions, query} = useEditor((state) => ({
		isHover: state.events.hovered,
		enabled: state.options.enabled,
	}))

	const {
		isHover,
		dom,
		name,
		moveable,
		deletable,
		connectors: {drag},
		parent,
	} = useNode((node) => ({
		isHover: node.events.hovered,
		dom: node.dom,
		name: node.data.custom.displayName || node.data.displayName,
		moveable: query.node(node.id).isDraggable(),
		deletable: query.node(node.id).isDeletable(),
		parent: node.data.parent,
		props: node.data.props,
	}))

	const currentRef = useRef<HTMLDivElement>()

	useEffect(() => {
		if (dom) {
			if (isHover && enabled) dom.classList.add('component-selected')
			else dom.classList.remove('component-selected')
		}
	}, [dom, isHover])

	const getPos = useCallback((dom: HTMLElement) => {
		const {top, left, bottom} = dom
			? dom.getBoundingClientRect()
			: {top: 0, left: 0, bottom: 0}
		return {
			top: `${top > 0 ? top : bottom}px`,
			left: `${left}px`,
		}
	}, [])

	const scroll = useCallback(() => {
		const {current: currentDOM} = currentRef

		if (!currentDOM) return
		const {top, left} = getPos(dom)
		currentDOM.style.top = top
		currentDOM.style.left = left
	}, [dom, getPos])

	// useEffect(() => {
	//   document
	//     .querySelector('.craftjs-renderer')
	//     .addEventListener('scroll', scroll);

	//   return () => {
	//     document
	//       .querySelector('.craftjs-renderer')
	//       .removeEventListener('scroll', scroll);
	//   };
	// }, [scroll]);

	// useEffect(() => {
	// 	document
	// 		.querySelector('.craftjs-renderer')
	// 		.addEventListener('scroll', scroll)

	// 	return () => {
	// 		document
	// 			.querySelector('.craftjs-renderer')
	// 			.removeEventListener('scroll', scroll)
	// 	}
	// }, [scroll])

	return (
		<>
			{isHover && enabled
				? ReactDOM.createPortal(
						<IndicatorDiv
							ref={currentRef}
							className="px-2 py-2 text-white bg-indigo-500 fixed flex items-center"
							style={{
								left: getPos(dom).left,
								top: getPos(dom).top,
								zIndex: 9999,
							}}
						>
							<h2 className="flex-1 mr-4">{name}</h2>
							{moveable ? (
								<Btn className="mr-2 cursor-move" ref={drag}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
										/>
									</svg>
								</Btn>
							) : null}
							{id !== ROOT_NODE && (
								<Btn
									className="mr-2 cursor-pointer"
									onClick={() => {
										actions.selectNode(parent)
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 11l5-5m0 0l5 5m-5-5v12"
										/>
									</svg>
								</Btn>
							)}
							{deletable ? (
								<Btn
									className="cursor-pointer mr-2"
									onMouseDown={(e: React.MouseEvent) => {
										e.stopPropagation()
										actions.delete(id)
									}}
								>
									<TrashIcon />
								</Btn>
							) : null}

							{id !== ROOT_NODE && (
								<Btn
									className="cursor-pointer"
									onMouseDown={(e: React.MouseEvent) => {
										const {
											id: nodeId,
											data: {type, props, parent: parentId},
											dom,
										} = query.node(id).get()
										e.stopPropagation()
										const prevIndex = query
											.getSerializedNodes()
											.ROOT.nodes.indexOf(nodeId)
										actions.add(
											query.createNode(
												React.createElement(type, {
													...props,
													marginBottom: '24px',
												})
											),
											parentId,
											prevIndex + 1
										)
									}}
								>
									<DuplicateIcon />
								</Btn>
							)}
						</IndicatorDiv>,
						document.querySelector('.page-container')
				  )
				: null}
			{render}
		</>
	)
}
export default RenderNode
