import {useEditor} from '@craftjs/core'
import {Tooltip, Button} from '@material-ui/core'
import cx from 'classnames'
import copy from 'copy-to-clipboard'
import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import lz from 'lzutf8'
import Checkmark from '../../../public/icons/check.svg'
import Customize from '../../../public/icons/customize.svg'
import RedoSvg from '../../../public/icons/toolbox/redo.svg'
import UndoSvg from '../../../public/icons/toolbox/undo.svg'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	HomeIcon,
} from '@heroicons/react/solid'
import {GetSingleFunnel} from '../../../services'

const HeaderDiv = styled.div`
	width: 100%;
	height: 45px;
	z-index: 99999;
	position: relative;
	padding: 0px 10px;
	background: #d4d4d4;
	display: flex;
`

const Btn = styled.a`
	display: flex;
	align-items: center;
	padding: 5px 15px;
	border-radius: 3px;
	color: #fff;
	font-size: 13px;
	svg {
		margin-right: 6px;
		width: 12px;
		height: 12px;
		fill: #fff;
		opacity: 0.9;
	}
`

const Item = styled.a<{disabled?: boolean}>`
	margin-right: 10px;
	cursor: pointer;
	svg {
		width: 20px;
		height: 20px;
		fill: #707070;
	}
	${(props) =>
		props.disabled &&
		`
    opacity:0.5;
    cursor: not-allowed;
  `}
`

interface IProps {
	data: GetSingleFunnel.Funnel
}
export const Header: React.FC<IProps> = ({data}) => {
	const {enabled, canUndo, canRedo, actions} = useEditor((state, query) => ({
		enabled: state.options.enabled,
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
	}))
	const [json, setJson] = useState<any>('')
	const {query} = useEditor()
	const handleEncode = () => {
		const serialized = query.serialize()
		const compressed = lz.encodeBase64(lz.compress(serialized))
		setJson(compressed)
	}
	const handleDecode = () => {
		const deCompressed = lz.decompress(lz.decodeBase64(json))
		// const deSerialized = actions.deserialize(deCompressed);
		copy(deCompressed)
	}

	const isDisabled = Boolean(json === '')

	const pages = [
		{name: 'Funnels', href: '/dashboard', current: false},
		{name: 'Funnel name', href: '#', current: true},
	]
	return (
		// <HeaderDiv className="header text-white transition w-full">
		// 	<div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
		// 		{enabled && (
		// 			<div className="flex-1 flex">
		// 				<Tooltip title="Undo" placement="bottom">
		// 					<Item disabled={!canUndo} onClick={() => actions.history.undo()}>
		// 						<UndoSvg />
		// 					</Item>
		// 				</Tooltip>
		// 				<Tooltip title="Redo" placement="bottom">
		// 					<Item disabled={!canRedo} onClick={() => actions.history.redo()}>
		// 						<RedoSvg />
		// 					</Item>
		// 				</Tooltip>
		// 			</div>
		// 		)}
		// 		<div className="flex">
		// 			{/* @ts-ignore */}
		// 			<Button onClick={handleEncode}>Encode me</Button>
		// 			<Button onClick={handleDecode} disabled={isDisabled}>
		// 				Decode me
		// 			</Button>
		// 			<Btn
		// 				className={cx([
		// 					'transition cursor-pointer',
		// 					{
		// 						'bg-green-400': enabled,
		// 						'bg-primary': !enabled,
		// 					},
		// 				])}
		// 				onClick={() => {
		// 					actions.setOptions((options) => (options.enabled = !enabled))
		// 				}}
		// 			>
		// 				{enabled ? <Checkmark /> : <Customize />}
		// 				{enabled ? 'Finish Editing' : 'Edit'}
		// 			</Btn>
		// 		</div>
		// 	</div>
		// </HeaderDiv>
		<div className="bg-white p-3 shadow-sm">
			<div className="mt-2 md:flex md:items-center md:justify-between ">
				<div className="flex-1 min-w-0">
					<nav className="flex" aria-label="Breadcrumb">
						<ol role="list" className="flex items-center space-x-4">
							<li>
								<div>
									<a href="#" className="text-gray-400 hover:text-gray-500">
										<HomeIcon
											className="flex-shrink-0 h-5 w-5"
											aria-hidden="true"
										/>
										<span className="sr-only">Home</span>
									</a>
								</div>
							</li>
							{data?.pages.map((page) => (
								<li key={page._id}>
									<div className="flex items-center">
										<ChevronRightIcon
											className="flex-shrink-0 h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
										<p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
											{page.title}
										</p>
									</div>
								</li>
							))}
						</ol>
					</nav>
				</div>
				{/* <div className="flex-1 min-w-0">
					<div>
						<Tooltip title="Undo" placement="bottom">
							<Item disabled={!canUndo} onClick={() => actions.history.undo()}>
								<UndoSvg />
							</Item>
						</Tooltip>
						<Tooltip title="Redo" placement="bottom">
							<Item disabled={!canRedo} onClick={() => actions.history.redo()}>
								<RedoSvg />
							</Item>
						</Tooltip>
					</div>
				</div> */}
				{!enabled ? (
					<div>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
							onClick={() => {
								actions.setOptions((options) => (options.enabled = !enabled))
							}}
						>
							Edit
						</button>
						<button
							type="button"
							className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
						>
							Publish
						</button>
					</div>
				) : (
					<div>
						{/* <div className="inline-flex justify-between">
							<div
								className="inline-flex text-indigo-500 text-xl cursor-pointer "
								onClick={actions.history.undo}
							>
								Undo
							</div>
							<div
								className="inline-flex text-indigo-500 text-lg font-bold cursor-pointer"
								onClick={actions.history.undo}
							>
								Redo
							</div>
						</div> */}
						<button
							type="button"
							className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
							onClick={() => {
								actions.setOptions((options) => (options.enabled = !enabled))
							}}
						>
							Finish editing
						</button>
					</div>
				)}
				<div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
			</div>
		</div>
	)
}
