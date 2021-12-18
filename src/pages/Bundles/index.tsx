import {CheckIcon} from '@heroicons/react/solid'
import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {MainFooter} from '../../components'
import Header from '../../components/common/Header'
import {AppState} from '../../reducers'
import {useHistory} from 'react-router-dom'

const BundlesPage = () => {
	const {bundles} = useSelector((state: AppState) => state.bundles)
	const {isAuthenticated} = useSelector((state: AppState) => state.auth)
	const history = useHistory()

	const isTrialLegit = false
	const handleSubscribe = useCallback(
		(id: string) => {
			if (!isAuthenticated) {
				history.push(`/sign-up/${id}`)
			} else {
				history.push('/profile')
			}
		},
		[isAuthenticated]
	)

	return (
		<div>
			<Header />
			<div className="bg-indigo-700">
				<div className="pt-12 sm:pt-16 lg:pt-24">
					<div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
						<div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
							<h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
								Pricing
							</h2>
							<p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
								The right price for you, whoever you are
							</p>
							<p className="text-xl text-gray-300">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
								sequi unde repudiandae natus.
							</p>
						</div>
					</div>
				</div>
				<div className="mt-8 pb-12 bg-indigo-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
					<div className="relative">
						<div className="absolute inset-0 h-3/4 bg-indigo-700" />
						<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
								{bundles.map((bundle) => (
									<div
										key={bundle.id}
										className="flex flex-col rounded-lg shadow-lg overflow-hidden"
									>
										<div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
											<div>
												<h3
													className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600"
													id="tier-standard"
												>
													{bundle.product.name}
												</h3>
											</div>
											<div className="mt-4 flex items-baseline text-6xl font-extrabold">
												{(bundle?.unit_amount / 100).toLocaleString()}$
											</div>
											<p className="mt-5 text-lg text-gray-500"></p>
										</div>
										<div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
											<ul role="list" className="space-y-4">
												{bundle.product.description
													.split('\\n')
													.map((feature, index) => (
														<li key={index} className="flex items-start">
															<div className="flex-shrink-0">
																<CheckIcon
																	className="h-6 w-6 text-green-500"
																	aria-hidden="true"
																/>
															</div>
															<p className="ml-3 text-base text-gray-700">
																{feature}
															</p>
														</li>
													))}
											</ul>
											<div className="rounded-md shadow">
												<button
													onClick={() => handleSubscribe(bundle?.id)}
													className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
													aria-describedby="tier-standard"
												>
													Start trial
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<MainFooter />
		</div>
	)
}

export default BundlesPage
