import React, {Fragment, useCallback, useState} from 'react'

import {RadioGroup} from '@headlessui/react'
import DashboardHeader from '../../components/web-components/DashboardHeader'
import Footer from '../../components/common/Footer'
import {Container} from '@material-ui/core'
import {AddPaymentMethod, SecondaryFooter} from '../../components'

const AccountSettings = () => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}

	const plans = [
		{
			name: 'Beignner',
			priceMonthly: 9.99,
			limit: '14 days free trial',
		},
		{
			name: 'Lifetime',
			priceMonthly: 299,
			limit: '14 days free trial',
		},
	]

	const payments = [
		{
			id: 1,
			date: '1/1/2020',
			datetime: '2020-01-01',
			description: 'Beginner Plan - Monthly Billing',
			amount: '$9.99',
			href: '#',
		},
		// More payments...
	]

	const [selectedPlan, setSelectedPlan] = useState(plans[1])

	const [open, setOpen] = useState(false)
	return (
		<>
			<DashboardHeader />
			<div className="space-y-6 pb-4">
				<Container>
					<div className="bg-white mt-3 shadow px-4 py-5 sm:rounded-lg sm:p-6">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Personal Information
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									Use a permanent address where you can receive mail.
								</p>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<form action="#" method="POST">
									<div className="grid grid-cols-4 gap-6">
										<div className="col-span-4 sm:col-span-2">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												First name
											</label>
											<input
												type="text"
												name="first-name"
												id="first-name"
												autoComplete="cc-given-name"
												className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
											/>
										</div>

										<div className="col-span-4 sm:col-span-2">
											<label
												htmlFor="last-name"
												className="block text-sm font-medium text-gray-700"
											>
												Last name
											</label>
											<input
												type="text"
												name="last-name"
												id="last-name"
												autoComplete="cc-family-name"
												className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
											/>
										</div>

										<div className="col-span-4 sm:col-span-2">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Email address
											</label>
											<input
												type="text"
												name="email-address"
												id="email-address"
												autoComplete="email"
												className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
											/>
										</div>

										<div className="col-span-4 sm:col-span-2">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												Billing address
											</label>
											<input
												type="text"
												name="first-name"
												id="first-name"
												autoComplete="cc-given-name"
												className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
											/>
										</div>

										<div className="col-span-4 sm:col-span-2">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												TAX (VAT number)
											</label>
											<input
												type="text"
												name="first-name"
												id="first-name"
												autoComplete="cc-given-name"
												className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
											/>
										</div>

										<div className="col-span-4 sm:col-span-2">
											<label
												htmlFor="postal-code"
												className="block text-sm font-medium text-gray-700"
											>
												ZIP / Postal code
											</label>
											<input
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className="bg-white mt-3 shadow px-4 py-5 sm:rounded-lg sm:p-6">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Plan
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									Use a permanent address where you can receive mail.
								</p>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
									<RadioGroup.Label className="sr-only">
										Pricing plans
									</RadioGroup.Label>
									<div className="relative bg-white rounded-md -space-y-px">
										{plans.map((plan, planIdx) => (
											<RadioGroup.Option
												key={plan.name}
												value={plan}
												className={({checked}) =>
													classNames(
														planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
														planIdx === plans.length - 1
															? 'rounded-bl-md rounded-br-md'
															: '',
														checked
															? 'bg-indigo-50 border-indigo-200 z-10'
															: 'border-gray-200',
														'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
													)
												}
											>
												{({active, checked}) => (
													<>
														<div className="flex items-center text-sm">
															<span
																className={classNames(
																	checked
																		? 'bg-indigo-500 border-transparent'
																		: 'bg-white border-gray-300',
																	active
																		? 'ring-2 ring-offset-2 ring-gray-900'
																		: '',
																	'h-4 w-4 rounded-full border flex items-center justify-center'
																)}
																aria-hidden="true"
															>
																<span className="rounded-full bg-white w-1.5 h-1.5" />
															</span>
															<RadioGroup.Label
																as="span"
																className="ml-3 font-medium text-gray-900"
															>
																{plan.name}
															</RadioGroup.Label>
														</div>
														<RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
															<span
																className={classNames(
																	checked ? 'text-indigo-900' : 'text-gray-900',
																	'font-medium'
																)}
															>
																${plan.priceMonthly}
															</span>{' '}
														</RadioGroup.Description>
														<RadioGroup.Description
															className={classNames(
																checked ? 'text-indigo-700' : 'text-gray-500',
																'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
															)}
														>
															{plan.limit}
														</RadioGroup.Description>
													</>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>
						</div>
					</div>

					<div className="bg-white mt-3 shadow px-4 py-5 sm:rounded-lg sm:p-6">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Billing history
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									The history of your payments on Funnelshero.
								</p>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Date
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Description
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Amount
											</th>
											{/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
											<th
												scope="col"
												className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												<span className="sr-only">View receipt</span>
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{payments.map((payment) => (
											<tr key={payment.id}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													<time dateTime={payment.datetime}>
														{payment.date}
													</time>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{payment.description}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{payment.amount}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<a
														href={payment.href}
														className="text-indigo-600 hover:text-indigo-900"
													>
														View receipt
													</a>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className="bg-white mt-3 shadow px-4 py-5 sm:rounded-lg sm:p-6">
						<div className="px-4 py-5 sm:p-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								Payment method
							</h3>
							<div className="mt-5">
								<div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
									<h4 className="sr-only">Visa</h4>
									<div className="sm:flex sm:items-start">
										<svg
											className="h-8 w-auto sm:flex-shrink-0 sm:h-6"
											viewBox="0 0 36 24"
											aria-hidden="true"
										>
											<rect width={36} height={24} fill="#224DBA" rx={4} />
											<path
												fill="#fff"
												d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
											/>
										</svg>
										<div className="mt-3 sm:mt-0 sm:ml-4">
											<div className="text-sm font-medium text-gray-900">
												Ending with 4242
											</div>
											<div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
												<div>Expires 12/20</div>
												<span
													className="hidden sm:mx-2 sm:inline"
													aria-hidden="true"
												>
													&middot;
												</span>
												<div className="mt-1 sm:mt-0">
													Last updated on 22 Aug 2017
												</div>
											</div>
										</div>
									</div>
									<div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
											onClick={() => setOpen(true)}
										>
											Add
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white my-3 shadow px-4 py-5 sm:rounded-lg sm:p-6">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Notifications
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									Decide which communications you would like to receive and how.
								</p>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<form className="space-y-6" action="#" method="POST">
									<fieldset>
										<legend className="text-base font-medium text-gray-900">
											By Email
										</legend>
										<div className="mt-4 space-y-4">
											<div className="flex items-start">
												<div className="h-5 flex items-center">
													<input
														id="comments"
														name="comments"
														type="checkbox"
														className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="comments"
														className="font-medium text-gray-700"
													>
														Daily Leads report
													</label>
													<p className="text-gray-500">
														Get notified daily of leads on your funnels.
													</p>
												</div>
											</div>
											<div className="flex items-start">
												<div className="flex items-center h-5">
													<input
														id="candidates"
														name="candidates"
														type="checkbox"
														className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="candidates"
														className="font-medium text-gray-700"
													>
														Daily Leads report
													</label>
													<p className="text-gray-500">
														Get notified weekly of leads on your funnels.
													</p>
												</div>
											</div>
											<div className="flex items-start">
												<div className="flex items-center h-5">
													<input
														id="offers"
														name="offers"
														type="checkbox"
														className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="offers"
														className="font-medium text-gray-700"
													>
														Offers
													</label>
													<p className="text-gray-500">
														Get notified with our latest offers.
													</p>
												</div>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							type="button"
							className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
				</Container>
			</div>
			<AddPaymentMethod open={open} setOpen={setOpen} />
			<SecondaryFooter />
		</>
	)
}

export default AccountSettings
