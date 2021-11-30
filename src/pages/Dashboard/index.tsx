import React, {useCallback, useEffect, useState} from 'react'
import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {DotsVerticalIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {getMyFunnels, GetMyFunnels} from '../../services'
import {Loading, NewFunnelModal, Wrapper} from '../../components'
import {MainFooter} from '../../components'
import {MainHeader} from '../../components'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {startAddFunnel, startInitializeMyFunnels} from '../../actions'
import {AppState} from '../../reducers'

const products = [
	{
		id: 1,
		name: 'Leather Long Wallet',
		color: 'Natural',
		price: '$75',
		href: '#',
		imageSrc:
			'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
		imageAlt: 'Hand stitched, orange leather long wallet.',
	},
]
const Dashboard: React.FC = () => {
	const [open, setOpen] = useState(false)
	const {funnels, loading} = useSelector((state: AppState) => state.funnels)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(startInitializeMyFunnels())
	}, [])
	const handleAddNewFunnel = useCallback(() => {
		setOpen(true)
		// dispatch(startAddFunnel({category: 'category', title: 'title'}))
	}, [])

	return (
		<React.Fragment>
			<MainHeader />
			<Wrapper loading={loading}>
				<div className="bg-white">
					<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
						<div className="md:flex md:items-center md:justify-between">
							<h2 className="text-2xl font-bold tracking-tight text-gray-800">
								All funnels
							</h2>
							<button
								onClick={handleAddNewFunnel}
								type="button"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								New funnel
							</button>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
							{funnels.map((funnel) => (
								<div key={funnel?._id} className="group relative">
									<div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
										<img
											src={products[0].imageSrc}
											alt={products[0].imageAlt}
											className="w-full h-full object-center object-cover"
										/>
									</div>
									<h3 className="mt-4 text-sm text-gray-700">
										<Link to={`/funnels/${funnel.title}`}>
											<span className="absolute inset-0" />
											{funnel.title}
										</Link>
									</h3>
									<p className="mt-1 text-sm text-gray-500">
										{funnel.category}
									</p>
									<Menu as="div" className="relative inline-block text-left">
										<div>
											<Menu.Button className=" rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
												<span className="sr-only">Open options</span>
												<DotsVerticalIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</Menu.Button>
										</div>

										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div className="py-1">
													<Menu.Item>
														{({active}) => (
															<Link
																to="#"
																className={classNames(
																	active
																		? 'bg-gray-100 text-gray-900'
																		: 'text-gray-700',
																	'block px-4 py-2 text-sm'
																)}
															>
																Account settings
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{({active}) => (
															<Link
																to="#"
																className={classNames(
																	active
																		? 'bg-gray-100 text-gray-900'
																		: 'text-gray-700',
																	'block px-4 py-2 text-sm'
																)}
															>
																Support
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{({active}) => (
															<Link
																to="#"
																className={classNames(
																	active
																		? 'bg-gray-100 text-gray-900'
																		: 'text-gray-700',
																	'block px-4 py-2 text-sm'
																)}
															>
																License
															</Link>
														)}
													</Menu.Item>
													<form method="POST" action="#">
														<Menu.Item>
															{({active}) => (
																<button
																	type="submit"
																	className={classNames(
																		active
																			? 'bg-gray-100 text-gray-900'
																			: 'text-gray-700',
																		'block w-full text-left px-4 py-2 text-sm'
																	)}
																>
																	Sign out
																</button>
															)}
														</Menu.Item>
													</form>
												</div>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							))}
						</div>

						<div className="mt-8 text-sm md:hidden">
							<Link
								to="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Shop the collection<span aria-hidden="true"> &rarr;</span>
							</Link>
						</div>
					</div>
				</div>
			</Wrapper>
			<NewFunnelModal open={open} setOpen={setOpen} />
			<MainFooter />
		</React.Fragment>
	)
}

export default Dashboard
