import React, {
	Fragment,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react'
import {Dialog, Transition, Listbox, Switch} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {categories} from '../../../constants'
import {IFunnel} from '../../../types'
import ConfirmationModal from '../ConfirmationModal'
import {useDispatch, useSelector} from 'react-redux'
import {startToggleActiveFunnel, startDeleteFunnel} from '../../../actions'
import {useParams, useHistory} from 'react-router-dom'
import {AppState} from '../../../reducers'

interface IProps {
	open: boolean
	setOpen: React.Dispatch<SetStateAction<boolean>>
}

type Params = {
	funnelTitle: string
}
const GeneralTab: React.FC<IProps> = ({open, setOpen}) => {
	const [selected, setSelected] = useState(categories[3])
	const [enabled, setEnabled] = useState(false)
	const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState<boolean>(false)
	const dispatch = useDispatch()
	const [confirmationModalOpen, setconfirmationModalOpen] =
		useState<boolean>(false)

	const {funnelTitle} = useParams<Params>()
	const {funnels} = useSelector((state: AppState) => state.funnels)

	const [funnelState, setFunnelState] = useState<IFunnel>()

	const history = useHistory()
	const fetchFunnel = useCallback(() => {
		const funnel = funnels.find((funnel) => funnel.title === funnelTitle)
		if (!funnel) {
			history.push('/404')
		} else {
			setFunnelState(funnel)
		}
	}, [funnelTitle])
	useEffect(() => {
		fetchFunnel()
		return () => {
			fetchFunnel()
		}
	}, [funnelTitle])

	const handleToggleActivate = useCallback(() => {
		dispatch(startToggleActiveFunnel(funnelState?._id))
		setconfirmationModalOpen(false)
	}, [dispatch, funnelState])
	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setFunnelState(prevState => ({
			...prevState,
			[event.target.id]: event.target.value,
		}))
	}, [])
	const handleDeleteFunnel = useCallback(() => {
		dispatch(startDeleteFunnel(funnelState?._id))
	}, [funnelState])
	return (
		<form className='space-y-8 divide-y divide-gray-200'>
			<div
				className='space-y-8 divide-y divide-gray-200 sm:space-y-5'
				style={{minHeight: '60vh'}}
			>
				<div>
					<div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5 '>
							<label
								htmlFor='title'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Funnel title
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='text'
										name='title'
										id='title'
										autoComplete='title'
										value={funnelState?.title}
										onChange={handleChange}
										className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300'
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='contactEmail'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
							>
								Contact email
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='email'
										name='contactEmail'
										id='contactEmail'
										autoComplete='email'
										value={funnelState?.contactEmail}
										onChange={handleChange}
										className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300'
									/>
								</div>
							</div>
						</div>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<Listbox
								value={funnelState?.category}
								onChange={(event) => {
									//@ts-ignore
									console.log(event.name)
									setFunnelState(prevState => ({
										...prevState,
										//@ts-ignore
										category: event.name,
									}))
									//implement on Change
								}}
							>
								{({open}) => (
									<>
										<Listbox.Label className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
											Category
										</Listbox.Label>
										<div className='mt-1 sm:mt-0 sm:col-span-2'>
											<div className='max-w-lg flex rounded-md shadow-sm'>
												<Listbox.Button
													className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
													<span className='block truncate'>
														{funnelState?.category}
													</span>
													<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
														<SelectorIcon
															className='h-5 w-5 text-gray-400'
															aria-hidden='true'
														/>
													</span>
												</Listbox.Button>
											</div>

											<Transition
												show={open}
												as={Fragment}
												leave='transition ease-in duration-100'
												leaveFrom='opacity-100'
												leaveTo='opacity-0'
											>
												<Listbox.Options
													className=' mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
													{categories.map((category, index) => (
														<Listbox.Option
															key={index}
															className={({active}) =>
																classNames(
																	active
																		? 'text-white bg-indigo-600'
																		: 'text-gray-900',
																	'cursor-default select-none relative py-2 pl-3 pr-9',
																)
															}
															value={category}
														>
															{({selected, active}) => (
																<>
																	<span
																		className={classNames(
																			selected
																				? 'font-semibold'
																				: 'font-normal',
																			'block truncate',
																		)}
																	>
																		{category?.name}
																	</span>

																	{selected ? (
																		<span
																			className={classNames(
																				active
																					? 'text-white'
																					: 'text-indigo-600',
																				'absolute inset-y-0 right-0 flex items-center pr-4',
																			)}
																		>
																			<CheckIcon
																				className='h-5 w-5'
																				aria-hidden='true'
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
						</div>

						<div className='bg-white  sm:rounded-lg'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<label className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
									Delete your funnel
								</label>
								<div className='mt-2 max-w-xl text-sm text-gray-500'>
									<p>
										Once you delete your funnel, you will lose all data
										associated with it.
									</p>
								</div>
								<div className='mt-5'>
									<button
										onClick={() => setDeleteConfirmationModalOpen(true)}
										type='button'
										className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm'
									>
										Delete funnel
									</button>
								</div>
							</div>
						</div>

						<Switch.Group
							as='div'
							className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'
						>
							<Switch.Label
								as='span'
								className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
								passive
							>
								Activate funnel
							</Switch.Label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<Switch
									checked={funnelState?.isActive}
									onChange={() => setconfirmationModalOpen(true)}
									className={classNames(
										funnelState?.isActive ? 'bg-teal-500' : 'bg-gray-200',
										'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ',
									)}
								>
									<span
										aria-hidden='true'
										className={classNames(
											funnelState?.isActive ? 'translate-x-5' : 'translate-x-0',
											'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
										)}
									/>
								</Switch>
							</div>
						</Switch.Group>
					</div>
				</div>
			</div>

			<div className='pt-5'>
				<div className='flex justify-end'>
					<button
						type='button'
						className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
					<button
						type='submit'
						className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
				</div>
			</div>

			<ConfirmationModal
				open={confirmationModalOpen}
				variant='Warning'
				title={`${funnelState?.isActive ? 'Deactivate' : 'Activate'} ${
					funnelState?.title
				}`}
				text={`Are you sure you want to ${
					funnelState?.isActive ? 'Deactivate' : 'Activate'
				} this funnel?`}
				buttonText='Yes, sure'
				setOpen={() => setconfirmationModalOpen(false)}
				action={handleToggleActivate}
			/>
			<ConfirmationModal
				open={deleteConfirmationModalOpen}
				variant='Warning'
				title={`Delete ${funnelState?.title}`}
				text={'Are you sure you want to delete this funnel?'}
				buttonText='Yes, sure'
				setOpen={() => setDeleteConfirmationModalOpen(false)}
				action={handleDeleteFunnel}
			/>

		</form>
	)
}

export default GeneralTab
