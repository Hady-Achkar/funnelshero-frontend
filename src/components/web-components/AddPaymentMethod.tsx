import React, {Fragment, useCallback, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {AppState} from '../../reducers'
import {useSelector, useDispatch} from 'react-redux'
import {startAddPaymentMethod} from '../../actions'

interface IStripeAddress {
	city: string
	country: string
	line1: string
	line2: string
	state: string
}

const AddPaymentMethod = ({open, setOpen}) => {
	const {
		user: {
			fullName,
			email,
			_id,
			paymentMethods,
		},
	} = useSelector((state: AppState) => state.auth)
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
	const stripe = useStripe()
	const elements = useElements()
	const dispatch = useDispatch()
	const [paymentData, setPaymentData] = useState<IStripeAddress>({
		city: '',
		country: '',
		line1: '',
		line2: '',
		state: '',
	})
	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentData(prevState => ({
			...prevState,
			[event.target.id]: event.target.value,
		}))
	}, [setPaymentData])
	const handleSubmit = useCallback(() => {
		const {country, line1, line2, city, state} = paymentData
		stripe
			.createPaymentMethod({
				type: 'card',
				card: elements.getElement(CardElement),

				billing_details: {
					name: fullName,
					email: email,
					address: {
						city,
						country,
						line1, line2, state,
					},
				},
				metadata: {
					_id,
				},
			})
			.then((res) => {
				dispatch(startAddPaymentMethod(res?.paymentMethod?.id))
			}).catch(err => {
			console.log(err)
		})
	}, [paymentData])
	console.log(paymentMethods)
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				initialFocus={ref}
				onClose={setOpen}
			>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div
							className='h-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
							<label
								htmlFor='first-name'
								className='block text-sm font-medium text-gray-700 mb-4'
							>
								Card Number
							</label>
							<div>
								<CardElement options={CARD_ELEMENT_OPTIONS} />
							</div>

							<label
								htmlFor='city'
								className='block text-sm font-medium text-gray-700 mb-4'
							>
								City
							</label>
							<input
								type={'text'}
								id={'city'}
								value={paymentData?.city}
								onChange={handleChange} placeholder={'City'} />
							<label
								htmlFor='country'
								className='block text-sm font-medium text-gray-700 mb-4'
							>
								Country
							</label>
							<input
								type={'text'}
								id={'country'}
								value={paymentData?.country}
								onChange={handleChange} placeholder={'country'} />
							<label
								htmlFor='country'
								className='block text-sm font-medium text-gray-700 mb-4'
							>
								Line 1
							</label>
							<input
								type={'text'}
								id={'line1'}
								value={paymentData?.line1}
								onChange={handleChange} placeholder={'line1'} />
							<label
								htmlFor='line2'
								className='block text-sm font-medium text-gray-700 mb-4'
							>
								Line 2
							</label>
							<input
								type={'text'}
								id={'line2'}
								value={paymentData?.line2}
								onChange={handleChange} placeholder={'line2'} />
							<label
								htmlFor='state'
								className='block text-sm font-medium text-gray-700 mb-4'
							>
								State
							</label>
							<input
								type={'text'}
								id={'state'}
								value={paymentData?.state}
								onChange={handleChange} placeholder={'state'} />
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
										type='button'
										onClick={handleSubmit}
										className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
