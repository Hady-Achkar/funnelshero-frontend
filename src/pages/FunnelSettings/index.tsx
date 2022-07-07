import React, {useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import {
	CheckCircleIcon,
	InformationCircleIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
import {AppState} from '../../reducers'
import {categories} from '../../constants'
import {useCopyToClipboard} from '../../hooks'
import {editFunnel} from '../../services'
import {startInitializeMyFunnels} from '../../actions'

const Index = () => {
	const {funnels} = useSelector((state: AppState) => state.funnels)
	const {funnelId} = useParams()

	const _funnel = funnels.find((f) => f._id === funnelId)
	const stats = [
		{name: 'Number of Pages', stat: _funnel.pages.length},
		{name: 'Base domain', stat: _funnel.baseDomain},
		{name: 'Avg. Click Rate', stat: '24.57%'},
	]

	const [value, copy] = useCopyToClipboard()

	const [formData, setFormData] = useState({
		funnelId: _funnel._id,
		proDomain: _funnel.proDomain,
		contactEmail: _funnel.contactEmail,
		category: _funnel.category,
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({...formData, [e.target.id]: e.target.value})
	}

	const dispatch = useDispatch()
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		editFunnel(formData)
			.then((res) => {
				console.log(res.data)
				dispatch(startInitializeMyFunnels)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	return (
		<>
			<Header />
			<div className="h-full">
				<main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
					<div className="my-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
							{_funnel.title}
						</h3>
						<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
							{stats.map((item) => (
								<div
									key={item.name}
									className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
								>
									<dt className="text-sm font-medium text-gray-500 truncate">
										{item.name}
									</dt>
									<dd className="mt-1 text-medium font-semibold text-gray-900">
										{item.stat}
									</dd>
								</div>
							))}
						</dl>
					</div>
					{/* Payment details */}
					<div className="space-y-6 sm:px-6 lg:px-0">
						<section aria-labelledby="payment-details-heading">
							<form onSubmit={handleSubmit}>
								<div className="shadow sm:rounded-md sm:overflow-hidden">
									<div className="bg-white py-6 px-4 sm:p-6">
										<div>
											<h2
												id="payment-details-heading"
												className="text-lg leading-6 font-medium text-gray-900"
											>
												Funnel Details
											</h2>
											<p className="mt-1 text-sm text-gray-500">
												Update your funnel settings. Please note that leaving
												your Pro Domain empty will affect the live version of
												your funnel.
											</p>
										</div>

										<div className="mt-6 grid grid-cols-4 gap-6">
											<div className="col-span-4 sm:col-span-2">
												<label
													htmlFor="title"
													className="block text-sm font-medium text-gray-700"
												>
													Title
												</label>
												<input
													type="text"
													disabled
													name="title"
													value={_funnel.title}
													id="title"
													className="mt-1 block w-full border bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
												/>
											</div>

											<div className="col-span-4 sm:col-span-2">
												<label
													htmlFor="category"
													className="block text-sm font-medium text-gray-700"
												>
													Category
												</label>
												<select
													name="category"
													id="category"
													onChange={handleChange}
													value={formData.category}
													autoComplete="cc-family-name"
													className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
												>
													{categories.map((item) => {
														return (
															<option
																className="capitalize"
																key={item.id}
																value={item.name}
															>
																{item.name}
															</option>
														)
													})}
												</select>
											</div>

											<div className="col-span-4 sm:col-span-2">
												<label
													htmlFor="proDomain"
													className="block text-sm font-medium text-gray-700"
												>
													Domain
												</label>
												<div className="mt-1 flex rounded-md shadow-sm">
													<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
														https://
													</span>
													<input
														type="text"
														name="proDomain"
														id="proDomain"
														className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
														placeholder="domain.com"
														onChange={handleChange}
														value={formData.proDomain}
													/>
												</div>
											</div>

											<div className="col-span-4 sm:col-span-2">
												<label
													htmlFor="contactEmail"
													className="block text-sm font-medium text-gray-700"
												>
													Contact Email
												</label>
												<input
													type="text"
													placeholder="mydomain.com"
													name="contactEmail"
													value={formData.contactEmail}
													onChange={handleChange}
													id="contactEmail"
													className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
												/>
											</div>

											<div className="rounded-md bg-indigo-50 p-4 col-span-4 sm:col-span-4">
												<div className="flex">
													<div className="flex-shrink-0">
														<InformationCircleIcon
															className="h-5 w-5 text-indigo-400"
															aria-hidden="true"
														/>
													</div>
													<div className="ml-3">
														<h3 className="text-sm font-medium text-indigo-800">
															Connect your Domain
														</h3>
														<div className="mt-2 text-sm text-indigo-700">
															<p>
																Go to your domain provider (GoDaddy, Namecheap,
																CloudFlare, etc.), Open DNS management and
																create a CNAME record with the name @ and copy
																the value from below.
															</p>
														</div>
														<div className="mt-4">
															<div className="-mx-2 -my-1.5 flex">
																<button
																	type="button"
																	className="bg-indigo-50 flex space-x-4 px-2 py-1.5 rounded-md text-sm font-medium text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-50 focus:ring-indigo-600"
																	onClick={() => copy(_funnel.baseDomain)}
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		className="h-4 w-4"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke="currentColor"
																		strokeWidth={2}
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
																		/>
																	</svg>
																	CNAME Value
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
										<button
											type="submit"
											className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
										>
											Save
										</button>
									</div>
								</div>
								<pre>{JSON.stringify(formData)}</pre>
							</form>
						</section>
					</div>
				</main>
			</div>
			<Footer />
		</>
	)
}

export default Index
