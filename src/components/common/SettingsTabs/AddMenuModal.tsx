import React, {useCallback, useEffect} from 'react'
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {ExclamationIcon} from '@heroicons/react/outline'

import {CheckIcon, PlusIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {useDispatch, useSelector} from 'react-redux'
import {IFunnel} from '../../../types'
import {AppState} from '../../../reducers'
import {useParams, useHistory} from 'react-router-dom'
import FunnelsSettings from '../FunnelSettings'

type Params = {
	funnelTitle: string
}
const AddMenuModal = ({open, setOpen}) => {
	const cancelButtonRef = useRef(null)
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
	}, [funnelTitle, funnels])
	useEffect(() => {
		fetchFunnel()
		return () => {
			fetchFunnel()
		}
	}, [funnelTitle, funnels])

	const [selected, setSelected] = useState(funnelState?.pages[3])
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
							<form>
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
											name="name"
											id="title"
											// onChange={handleChange}
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
										<div>
											<label htmlFor="postal-code" className="sr-only">
												Link title
											</label>
											<input
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
												placeholder="Link title"
											/>
										</div>
										<div>
											<label htmlFor="country" className="sr-only">
												Link to page
											</label>
											<select
												id="country"
												name="country"
												autoComplete="country-name"
												className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-b-md  focus:z-10 sm:text-sm border-gray-300"
											>
												<option>Page 1</option>
												<option>Page 2</option>
												<option>Page 3</option>
											</select>
										</div>
									</div>
									<div className="flex justify-end mt-2">
										<button
											type="button"
											className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Add link
											<PlusIcon
												className="ml-2 -mr-0.5 h-4 w-4"
												aria-hidden="true"
											/>
										</button>
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
