import React, {useCallback} from 'react'
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {ExclamationIcon} from '@heroicons/react/outline'

import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {IAddFunnelPayload, startAddFunnel} from '../../actions'
import {useDispatch} from 'react-redux'
import {categories} from '../../constants'
import {CardElement} from '@stripe/react-stripe-js'

const AddPaymentMethod = ({open, setOpen}) => {
	const [selected, setSelected] = useState(categories[3])

	const CARD_ELEMENT_OPTIONS = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	}
	const ref = useRef()
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				initialFocus={ref}
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
							<label
								htmlFor="first-name"
								className="block text-sm font-medium text-gray-700 mb-4"
							>
								TAX (VAT number)
							</label>
							<CardElement options={CARD_ELEMENT_OPTIONS} />
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
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default AddPaymentMethod
