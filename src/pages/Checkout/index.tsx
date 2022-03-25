import React, {useCallback, useEffect, useState} from 'react'
import DashboardHeader from '../../components/web-components/DashboardHeader'
import {MainFooter} from '../../components'
import {getCheckoutDetails, GetCheckoutDetails} from '../../services'
import {useHistory, useParams} from 'react-router-dom'
import {IBundle} from '../../types'
import {AppState} from '../../reducers'
import {useSelector} from 'react-redux'

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
	const [checkoutDetails, setCheckoutDetails] = useState<GetCheckoutDetails.Price>()
	const [productDetails, setProductDetails] = useState<IBundle>()
	const {bundles} = useSelector((state: AppState) => state.bundles)
	const [loading, setLoading] = useState<boolean>(false)
	const fetchCheckoutDetails = useCallback(() => {
		setLoading(true)
		getCheckoutDetails(priceId).then(res => {
			const {price} = res.data
			setCheckoutDetails(price)
			const actualProduct = bundles.find(item => item?.id === priceId)
			if (!actualProduct) history.push('/404')
			setProductDetails(actualProduct)
			setLoading(false)
		}).catch(err => {
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
	const handleSubmit = useCallback(() => {

	}, [priceId])
	return (
		<div className='bg-gray-50'>
			<DashboardHeader />
			<main className='max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-2xl mx-auto lg:max-w-none'>
					<h1 className='sr-only'>Checkout</h1>
					{loading ? <p>Loading</p> :
						<form className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>


							{/* Order summary */}
							<div className='mt-10 lg:mt-0'>
								<h2 className='text-lg font-medium text-gray-900'>
									Order summary
								</h2>

								<div className='mt-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
									<dl className='border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6'>
										<div className='flex items-center justify-between'>
											<dt className='text-sm'>Subtotal</dt>
											<dd className='text-sm font-medium text-gray-900'>
												$ {checkoutDetails?.unit_amount / 100}
											</dd>
										</div>

										<div className='flex items-center justify-between'>
											<dt className='text-sm'>Taxes</dt>
											<dd className='text-sm font-medium text-gray-900'>{checkoutDetails?.tax_behavior}</dd>
										</div>
										<div className='flex items-center justify-between border-t border-gray-200 pt-6'>
											<dt className='text-base font-medium'>Total</dt>
											<dd className='text-base font-medium text-gray-900'>
												$ {checkoutDetails?.unit_amount / 100}
											</dd>
										</div>
									</dl>

									<div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
										<button
											type='button'
											onClick={handleSubmit}
											className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
										>
											Confirm payment
										</button>
									</div>
								</div>
							</div>
						</form>
					}

				</div>
			</main>
			<MainFooter />
		</div>
	)
}
export default Checkout
