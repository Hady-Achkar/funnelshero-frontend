import React, {Fragment, useCallback, useEffect, useState} from 'react'
import DashboardHeader from '../../components/web-components/DashboardHeader'
import {MainFooter} from '../../components'
import {
	addPaymentMethod,
	getCheckoutDetails,
	GetCheckoutDetails,
	subscribe,
} from '../../services'
import {useHistory, useParams} from 'react-router-dom'
import {IBundle} from '../../types'
import {AppState} from '../../reducers'
import {useDispatch, useSelector} from 'react-redux'
import {
	CardElement,
	CardElementProps,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import countries from '../../data/countries'
import {changeAccountStatus} from '../../actions'
import {UserState} from '../../models/IUser'

const products = [
	{
		id: 1,
		title: 'Basic plan',
		href: '#',
		price: '$9.99',
	},
]
type Params = {
	priceId: string
}

const Checkout = () => {
	const {priceId} = useParams<Params>()
	const history = useHistory()
	const [checkoutDetails, setCheckoutDetails] =
		useState<GetCheckoutDetails.Price>()
	const [productDetails, setProductDetails] = useState<IBundle>()
	const {bundles} = useSelector((state: AppState) => state.bundles)
	const {user} = useSelector((state: AppState) => state.auth)
	const [loading, setLoading] = useState<boolean>(false)
	const fetchCheckoutDetails = useCallback(() => {
		setLoading(true)
		getCheckoutDetails(priceId)
			.then((res) => {
				const {price} = res.data
				setCheckoutDetails(price)
				const actualProduct = bundles.find((item) => item?.id === priceId)
				if (!actualProduct) history.push('/404')
				setProductDetails(actualProduct)
				setLoading(false)
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message)
				} else {
					console.log(err)
				}
			})
	}, [priceId])
	useEffect(() => {
		if (!priceId) {
			history.push('/')
		}
		fetchCheckoutDetails()
		return () => fetchCheckoutDetails()
	}, [fetchCheckoutDetails, priceId])

	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const [declineReason, setDeclineReason] = useState<string>('')
	const [termsErrorOpen, setTermsErrorOpen] = useState<boolean>(false)
	const dispatch = useDispatch()
	const [isAcceptedTerms, setIsAcceptedTerms] = useState<boolean>(false)

	const [paymentData, setPaymentData] = useState({
		city: '',
		country: '',
		line1: '',
		line2: '',
		state: '',
		postalCode: '',
	})

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			const {city, country, line1, line2, state} = paymentData
			e.preventDefault()
			stripe
				.createPaymentMethod({
					type: 'card',
					//@ts-ignore
					card: elements.getElement(CardElement),
					billing_details: {
						name: user.fullName,
						email: user.email,
						address: {
							city,
							country,
							line1,
							line2,
							state,
						},
					},
				})
				.then((res) => {
					const paymentMethodId = res.paymentMethod.id
					subscribe(priceId, paymentMethodId)
						.then((res) => {
							dispatch(changeAccountStatus(UserState.SUB_ACTIVE))
							history.push('/dashboard')
						})
						.catch((err) => {
							console.log(err)
						})
				})
				.catch((err) => {
					console.log(err)
				})
		},
		[paymentData, user]
	)

	const handleChangePaymentData = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setPaymentData({...paymentData, [e.target.id]: e.target.value})
	}
	const CARD_ELEMENT_OPTIONS: CardElementProps = {
		className:
			'block w-full border border-gray-300 rounded-md shadow-sm  sm:text-sm py-3 px-2',
		options: {
			style: {
				invalid: {
					color: '#fa755a',
					iconColor: '#fa755a',
				},
			},
		},
	}
	const stripe = useStripe()
	const elements = useElements()

	const sortedCountries = countries.sort((a: any, b: any) =>
		a.label > b.label ? 1 : -1
	)

	return (
		<div className="bg-gray-50">
			<DashboardHeader />
			<main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto lg:max-w-none">
					<h1 className="sr-only">Checkout</h1>
					{loading ? (
						<p>Loading</p>
					) : (
						<Fragment>
							<form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
								<div className="mt-10 lg:mt-0">
									<h2 className="text-lg font-medium text-gray-900">
										Order summary
									</h2>

									<div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
										<dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
											<div className="flex items-center justify-between">
												<dt className="text-sm">Subtotal</dt>
												<dd className="text-sm font-medium text-gray-900">
													$ {checkoutDetails?.unit_amount / 100}
												</dd>
											</div>

											<div className="flex items-center justify-between">
												<dt className="text-sm">Taxes</dt>
												<dd className="text-sm font-medium text-gray-500">
													{checkoutDetails?.tax_behavior.toLocaleUpperCase()}
												</dd>
											</div>
											<div className="flex items-center justify-between border-t border-gray-200 pt-6">
												<dt className="text-base font-medium">Total</dt>
												<dd className="text-base font-medium text-gray-900">
													$ {checkoutDetails?.unit_amount / 100}
												</dd>
											</div>
										</dl>
										<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
											<button
												type="submit"
												onClick={handleSubmit}
												className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
											>
												Confirm payment
											</button>
										</div>
									</div>
								</div>

								<div className="mt-10 lg:mt-0 ">
									<h2 className="text-lg font-medium text-gray-900">
										Payment details
									</h2>
									<div className="mt-4 px-4 py-4  space-y-3 bg-white border border-gray-200 rounded-lg shadow-sm">
										<dl className="">
											<CardElement {...CARD_ELEMENT_OPTIONS} />
										</dl>
										<div className="max-w-lg mx-auto lg:max-w-none">
											<section aria-labelledby="contact-info-heading">
												<div>
													<label
														htmlFor="email-address"
														className="block text-sm font-medium text-gray-700"
													>
														Email address
													</label>
													<div className="mt-1">
														<input
															type="email"
															value={user.email}
															disabled
															id="email-address"
															name="email-address"
															autoComplete="email"
															className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
														/>
													</div>
												</div>
											</section>

											<section
												aria-labelledby="payment-heading"
												className="mt-4"
											/>

											<section aria-labelledby="shipping-heading">
												<div className=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
													<div className="sm:col-span-3">
														<label
															htmlFor="country"
															className="block text-sm font-medium text-gray-700"
														>
															Country
														</label>
														<div className="mt-1">
															<select
																// onChange={handleChange}
																onChange={handleChangePaymentData}
																name="country"
																id={'country'}
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															>
																<option selected disabled hidden>
																	Select a country
																</option>
																{sortedCountries.map((item, index) => {
																	return (
																		<option key={index} value={item.code}>
																			{item.label}
																		</option>
																	)
																})}
															</select>
														</div>
													</div>

													<div className="sm:col-span-3">
														<label
															htmlFor="address"
															className="block text-sm font-medium text-gray-700"
														>
															Address #1
														</label>
														<div className="mt-1">
															<input
																onChange={handleChangePaymentData}
																type="text"
																id="line1"
																name="line1"
																autoComplete="street-address"
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
													</div>

													<div className="sm:col-span-3">
														<label
															htmlFor="address2"
															className="block text-sm font-medium text-gray-700"
														>
															Address #2
														</label>
														<div className="mt-1">
															<input
																onChange={handleChangePaymentData}
																id="line2"
																name="line2"
																type="text"
																autoComplete="street-address2"
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
													</div>
													<div>
														<label
															htmlFor="city"
															className="block text-sm font-medium text-gray-700"
														>
															City
														</label>
														<div className="mt-1">
															<input
																onChange={handleChangePaymentData}
																id="city"
																name="city"
																type="text"
																autoComplete="address-level2"
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
													</div>

													<div>
														<label
															htmlFor="region"
															className="block text-sm font-medium text-gray-700"
														>
															State
														</label>
														<div className="mt-1">
															<input
																onChange={handleChangePaymentData}
																id="state"
																name="state"
																type="text"
																autoComplete="address-level1"
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
													</div>

													<div>
														<label
															htmlFor="postal-code"
															className="block text-sm font-medium text-gray-700"
														>
															Postal code
														</label>
														<div className="mt-1">
															<input
																onChange={handleChangePaymentData}
																id="postalCode"
																name="postalCode"
																type="text"
																autoComplete="postal-code"
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
													</div>
												</div>
											</section>
										</div>
									</div>
								</div>
							</form>
						</Fragment>
					)}
				</div>
			</main>
			<MainFooter />
		</div>
	)
}
export default Checkout
