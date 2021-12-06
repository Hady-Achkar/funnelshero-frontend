import React from 'react'
import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CheckIcon} from '@heroicons/react/outline'

const FunnelsSettings = ({open, setOpen}) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
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
						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:my-8 sm:align-middle sm:w-full sm:p-6">
							<form className="space-y-8 divide-y divide-gray-200">
								<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
									<div>
										<div>
											<h3 className="text-lg leading-6 font-medium text-gray-900">
												Funnel Settings
											</h3>
											<p className="mt-1 max-w-2xl text-sm text-gray-500">
												Edit the general funnel details
											</p>
										</div>

										<div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
											<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
												<label
													htmlFor="title"
													className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
												>
													Funnel title
												</label>
												<div className="mt-1 sm:mt-0 sm:col-span-2">
													<div className="max-w-lg flex rounded-md shadow-sm">
														<input
															type="text"
															name="title"
															id="title"
															autoComplete="title"
															className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300"
														/>
													</div>
												</div>
											</div>

											<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
												<label
													htmlFor="email"
													className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
												>
													Contact email
												</label>
												<div className="mt-1 sm:mt-0 sm:col-span-2">
													<div className="max-w-lg flex rounded-md shadow-sm">
														<input
															type="email"
															name="email"
															id="email"
															autoComplete="email"
															className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300"
														/>
													</div>
												</div>
											</div>

											<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
												<label
													htmlFor="meta"
													className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
												>
													Meta desctiption
												</label>
												<div className="mt-1 sm:mt-0 sm:col-span-2">
													<textarea
														id="meta"
														name="meta"
														rows={3}
														className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
														defaultValue={''}
													/>
													<p className="mt-2 text-sm text-gray-500">
														Meta description, recommended for SEO
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
										<div>
											<h3 className="text-lg leading-6 font-medium text-gray-900">
												Publish settings
											</h3>
											<p className="mt-1 max-w-2xl text-sm text-gray-500">
												Add a domain name, or use our default
											</p>
										</div>
										<div className="space-y-6 sm:space-y-5">
											<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
												<label
													htmlFor="domain"
													className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
												>
													Domain name
												</label>
												<div className="mt-1 sm:mt-0 sm:col-span-2">
													<div className="max-w-lg flex rounded-md shadow-sm">
														<input
															type="text"
															name="domain"
															id="domain"
															autoComplete="domain"
															className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300"
														/>
													</div>
												</div>
											</div>

											<div className="bg-white  sm:rounded-lg">
												<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
													<label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
														Delete your funnel
													</label>
													<div className="mt-2 max-w-xl text-sm text-gray-500">
														<p>
															Once you delete your funnel, you will lose all
															data associated with it.
														</p>
													</div>
													<div className="mt-5">
														<button
															type="button"
															className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
														>
															Delete account
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

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

export default FunnelsSettings
