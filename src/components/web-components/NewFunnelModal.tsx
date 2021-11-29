import React from 'react'
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {ExclamationIcon} from '@heroicons/react/outline'

import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
const NewFunnelModal = ({open, setOpen}) => {
	const cancelButtonRef = useRef(null)
	const people = [
		{id: 1, name: 'Domestic companies'},
		{id: 2, name: 'Barber shops'},
		{id: 3, name: 'Malls and stores'},
		{id: 4, name: 'Gym and spa'},
		{id: 5, name: 'Clothing'},
		{id: 6, name: 'Hellen Schmidt'},
		{id: 7, name: 'Caroline Schultz'},
		{id: 8, name: 'Mason Heaney'},
		{id: 9, name: 'Claudie Smitham'},
		{id: 10, name: 'Emil Schaefer'},
	]

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const [selected, setSelected] = useState(people[3])
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
										Funnel name
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="name"
											id="name"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
											placeholder="The awesome funnel!"
										/>
									</div>
								</div>

								<Listbox value={selected} onChange={setSelected}>
									{({open}) => (
										<>
											<Listbox.Label className="block text-sm font-medium text-gray-700">
												Category
											</Listbox.Label>
											<div className="mt-1 relative">
												<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
													<span className="block truncate">
														{selected.name}
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
														{people.map((person) => (
															<Listbox.Option
																key={person.id}
																className={({active}) =>
																	classNames(
																		active
																			? 'text-white bg-indigo-600'
																			: 'text-gray-900',
																		'cursor-default select-none relative py-2 pl-3 pr-9'
																	)
																}
																value={person}
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
																			{person.name}
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
								<div className="pt-5">
									<div className="flex justify-end">
										<button
											type="button"
											className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											onClick={() => setOpen(false)}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Save
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

export default NewFunnelModal
