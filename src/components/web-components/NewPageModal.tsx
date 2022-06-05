import React, {SetStateAction, useCallback} from 'react'
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {ExclamationIcon} from '@heroicons/react/outline'

import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {
	IAddFunnelPayload,
	IAddPage,
	startAddFunnel,
	startAddPage,
} from '../../actions'
import {useDispatch} from 'react-redux'
interface IProps {
	funnelId: string
	open: boolean
	setOpen: React.Dispatch<SetStateAction<Boolean>>
}
const NewFunnelModal: React.FC<IProps> = (props) => {
	const {open, setOpen, funnelId} = props
	const [newPageData, setNewPageData] = useState<IAddPage>({
		funnelId,
		title: '',
	})
	const cancelButtonRef = useRef(null)

	const dispatch = useDispatch()
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(startAddPage(newPageData))

		setOpen(false)
	}
	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPageData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value.toLowerCase(),
		}))
	}, [])

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
										Page title
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="name"
											id="title"
											onChange={handleChange}
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
											placeholder="The Awsome Page!"
										/>
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

export default NewFunnelModal
