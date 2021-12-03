import React, {Fragment} from 'react'
import {Menu, Popover, Transition} from '@headlessui/react'
import {SearchIcon} from '@heroicons/react/solid'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import Logo from '../../assets/icon-only.png'
import {NewFunnelModal} from '..'
import {useHistory} from 'react-router-dom'

const user = {
	name: 'Chelsea Hagon',
	email: 'chelseahagon@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
	{name: 'Dashboard', href: '#', current: true},
	{name: 'Calendar', href: '#', current: false},
	{name: 'Teams', href: '#', current: false},
	{name: 'Directory', href: '#', current: false},
]
const userNavigation = [
	{name: 'Your Profile', href: '#'},
	{name: 'Settings', href: '#'},
	{name: 'Sign out', href: '#'},
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const DashboardHeader = () => {
	const [modalOpen, setModalOpen] = React.useState(false)

	const history = useHistory()
	return (
		<>
			{/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
			<Popover
				as="header"
				className={({open}) =>
					classNames(
						open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
						'bg-white shadow-sm lg:static lg:overflow-y-visible'
					)
				}
			>
				{({open}) => (
					<>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b divide-gray-200">
							<div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
								<div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
									<div className="flex-shrink-0 flex items-center">
										<img
											className="block h-8 w-auto hover:opacity-80 cursor-pointer"
											src={Logo}
											alt="Workflow"
											onClick={() => history.push('/')}
										/>
									</div>
								</div>
								<div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
									<div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
										<div className="w-full">
											<label htmlFor="search" className="sr-only">
												Search
											</label>
											<div className="relative">
												<div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
													<SearchIcon
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</div>
												<input
													id="search"
													name="search"
													className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													placeholder="Search"
													type="search"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
									{/* Mobile menu button */}
									<Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Open menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Popover.Button>
								</div>
								<div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
									<a
										href="#"
										className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										<span className="sr-only">View notifications</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
											/>
										</svg>
									</a>

									{/* Profile dropdown */}

									<button
										onClick={() => setModalOpen(true)}
										className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										New Funnel
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</Popover>
			<NewFunnelModal open={modalOpen} setOpen={setModalOpen} />
		</>
	)
}
export default DashboardHeader
