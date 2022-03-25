import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react'
import {Dialog, Listbox, Transition} from '@headlessui/react'
import {CheckIcon, PlusIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {useSelector} from 'react-redux'
import {IFunnel} from '../../../types'
import {AppState} from '../../../reducers'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {startAddMenu} from '../../../actions'

type Params = {
	funnelTitle: string
}
const AddMenuModal = ({open, setOpen}) => {
	const dispatch = useDispatch()
	const cancelButtonRef = useRef(null)
	const {funnelTitle} = useParams<Params>()
	const {funnels} = useSelector((state: AppState) => state.funnels)
	const [linkSelected, setLinkSelected] = useState({
		title: 'Select a link',
		href: '',
	})
	const [funnelState, setFunnelState] = useState<IFunnel>()

	const history = useHistory()
	const fetchFunnel = useCallback(() => {
		const funnel = funnels.find((funnel) => funnel.title === funnelTitle)
		if (!funnel) {
			history.push('/404')
		} else {
			setFunnelState(funnel)
		}
	}, [funnelTitle, funnels])
	useEffect(() => {
		fetchFunnel()
		return () => {
			fetchFunnel()
		}
	}, [funnelTitle, funnels])

	const [menuData, setMenuData] = useState({
		title: '',
		links: [],
	})
	const [linkPlaceHolder, setLinkPlaceHolder] = useState({
		title: '',
		href: '',
	})
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setMenuData((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[setMenuData]
	)
	const handleChangeLink = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setLinkPlaceHolder((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[setMenuData]
	)

	const handleAddLink = () => {
		setMenuData((prevState) => ({
			...prevState,
			links: [...prevState.links, linkPlaceHolder],
		}))
		setLinkPlaceHolder({
			title: '',
			href: '',
		})
	}
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(startAddMenu(menuData, funnelState?._id))
	}
	const isAddLinkDisabled = Boolean(
		linkPlaceHolder.title === '' || linkPlaceHolder.href === ''
	)
	const isAddMenuDisabled = Boolean(menuData?.title === '')
	const handleDeleteLink = useCallback(
		(index: number) => {
			const filteredLinks = menuData.links.filter(
				(item, innerIndex) => innerIndex !== index
			)
			setMenuData((prevState) => ({
				...prevState,
				links: filteredLinks,
			}))
		},
		[setMenuData]
	)
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="h-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
							<form onSubmit={handleSubmit}>
								<div className="my-2">
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700"
									>
										Menu title
									</label>
									<div className="mt-1">
										<input
											type="text"
											id="title"
											value={menuData?.title}
											onChange={handleChange}
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
											placeholder="Header"
										/>
									</div>
								</div>
								<fieldset className="mt-6 bg-white">
									<legend className="block text-sm font-medium text-gray-700">
										Create a link
									</legend>
									<legend className="block text-xs font-medium text-gray-500">
										Use the form below to add more links
									</legend>
									<div className="mt-1 rounded-md shadow-sm -space-y-px">
										{menuData.links.map((item, index) => {
											return (
												<div key={index} className={'flex'}>
													<p>{item?.title}</p>
													<p>{item?.href}</p>
													<button onClick={() => handleDeleteLink(index)}>
														Delete
													</button>
												</div>
											)
										})}
										<div>
											<label htmlFor="title" className="sr-only">
												Link title
											</label>
											<input
												type="text"
												name="title"
												id="title"
												onChange={handleChangeLink}
												value={linkPlaceHolder?.title}
												autoComplete="title"
												className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
												placeholder="Link title"
											/>
										</div>
										<Listbox
											value={linkSelected}
											onChange={(e) => {
												setLinkSelected({
													//@ts-ignore
													href: e?.link,
													//@ts-ignore
													title: e?.title,
												})
												//@ts-ignore
												setLinkPlaceHolder((prevState) => ({
													...prevState,
													//@ts-ignore
													href: e.link,
												}))
											}}
										>
											{({open}) => (
												<>
													<Listbox.Label className="block text-sm font-medium text-gray-700">
														Pages
													</Listbox.Label>
													<div className="mt-1 relative">
														<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
															<span className="block truncate">
																{linkSelected?.title}
															</span>
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
																{funnelState?.pages.map((page) => (
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
																						selected
																							? 'font-semibold'
																							: 'font-normal',
																						'block truncate'
																					)}
																				>
																					{page?.title}
																				</span>

																				{selected ? (
																					<span
																						className={classNames(
																							active
																								? 'text-white'
																								: 'text-indigo-600',
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
										<div className="flex justify-end mt-2">
											<button
												type="button"
												onClick={handleAddLink}
												disabled={isAddLinkDisabled}
												className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												Add link
												<PlusIcon
													className="ml-2 -mr-0.5 h-4 w-4"
													aria-hidden="true"
												/>
											</button>
										</div>
									</div>
								</fieldset>
								<div className="pt-5">
									<div className="flex justify-end">
										<button
											type="button"
											className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											onClick={() => setOpen(false)}
										>
											Discard
										</button>
										<button
											type="submit"
											disabled={isAddMenuDisabled}
											onClick={handleSubmit}
											className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Finish
										</button>
									</div>
								</div>
							</form>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default AddMenuModal
