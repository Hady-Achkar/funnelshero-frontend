import {useEditor} from '@craftjs/core'
import {Tooltip, Button} from '@material-ui/core'
import cx from 'classnames'
import copy from 'copy-to-clipboard'
import React, {Fragment, useCallback, useState} from 'react'
import styled from 'styled-components'
import lz from 'lzutf8'
import {
	CheckIcon,
	ChevronRightIcon,
	HomeIcon,
	SelectorIcon,
} from '@heroicons/react/solid'
import {GetMyFunnels, GetSingleFunnel} from '../../../services'
import {Listbox, Transition} from '@headlessui/react'
import classNames from 'classnames'
import {NewPageModal} from '../..'
import {startSavePageData} from '../../../actions'
import {useDispatch} from 'react-redux'
interface IProps {
	data: GetMyFunnels.Funnel
	handleChangePage: (page: GetSingleFunnel.Page) => void
	mainPage: GetSingleFunnel.Page
}
export const Header: React.FC<IProps> = (props) => {
	const {data, handleChangePage, mainPage} = props

	const [newPageModalOpen, setNewPageModalOpen] = useState<boolean>(false)
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
	// title: string
	// data: string
	// funnelId: string
	// pageId: string
	const dispatch = useDispatch()
	const handleDecode = () => {
		const serialized = query.serialize()
		const compressed = lz.encodeBase64(lz.compress(serialized))
		const deCompressed = lz.decompress(lz.decodeBase64(compressed))
		// const deSerialized = actions.deserialize(deCompressed);
		dispatch(
			startSavePageData({
				title: mainPage?.title,
				data: deCompressed,
				funnelId: data?._id,
				pageId: mainPage?._id,
			})
		)
	}

	const isDisabled = Boolean(json === '')

	return (
		<div className="bg-white p-3 shadow-sm">
			<div className="mt-2 md:flex md:items-center md:justify-between ">
				{/* <div className="flex-1 min-w-0">
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
				</div> */}
				<Listbox
					value={mainPage}
					onChange={(e) => {
						handleChangePage(e)
					}}
				>
					{({open}) => (
						<>
							<Listbox.Label className="block text-sm font-medium text-gray-700">
								Pages
							</Listbox.Label>
							<div className="mt-1 relative">
								<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
									<span className="block truncate">{mainPage?.title}</span>
									<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
										<SelectorIcon
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</span>
								</Listbox.Button>

								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className=" mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
										{data?.pages.map((page) => (
											<Listbox.Option
												key={page._id}
												className={({active}) =>
													classNames(
														active
															? 'text-white bg-indigo-600'
															: 'text-gray-900',
														'cursor-default select-none relative py-2 pl-3 pr-9'
													)
												}
												value={page}
											>
												{({selected, active}) => (
													<>
														<span
															className={classNames(
																selected ? 'font-semibold' : 'font-normal',
																'block truncate'
															)}
														>
															{page.title}
														</span>

														{selected ? (
															<span
																className={classNames(
																	active ? 'text-white' : 'text-indigo-600',
																	'absolute inset-y-0 right-0 flex items-center pr-4'
																)}
															>
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox>
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
				<div>
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
						onClick={() => {
							setNewPageModalOpen(true)
						}}
					>
						Add New Page
					</button>
				</div>

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
								// actions.setOptions((options) => (options.enabled = !enabled))
								handleDecode()
							}}
						>
							Save page
						</button>
					</div>
				)}
				<div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
				<NewPageModal
					open={newPageModalOpen}
					setOpen={setNewPageModalOpen}
					funnelId={data?._id}
				/>
			</div>
		</div>
	)
}
