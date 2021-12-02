import React, {Fragment, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppState} from '../../reducers'
import Logo from '../../assets/icon-only.png'
import {logoutAction} from '../../actions'
import {Menu, Transition, Popover} from '@headlessui/react'
import {ChevronDownIcon, MenuIcon, XIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import ConfirmationModal from './ConfirmationModal'

const navigation = [
	{name: 'Pricing', href: '/pricing'},
	{name: 'About', href: '/about'},
	{name: 'Contact', href: '/contact'},
	{name: 'Case Study', href: '/case-study'},
	{name: 'Blogs', href: '/blogs'},
]

const Header = () => {
	const [open, setOpen] = useState<boolean>(false)

	const {
		isAuthenticated,
		user: {fullName, email},
	} = useSelector((state: AppState) => state.auth)
	const dispatch = useDispatch()
	const handleLogout = () => {
		setOpen(false)
		dispatch(logoutAction())
	}

	return (
		<header>
			<Popover className="relative bg-white">
				<div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<a href="#">
							<span className="sr-only">Workflow</span>
							<img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
						</a>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="sr-only">Open menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>

					{navigation.map((item, index) => {
						return (
							<Link
								to={item.href}
								key={index}
								className="text-gray-500 font-light text-md hover:text-gray-900"
							>
								{item.name}
							</Link>
						)
					})}
					<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
						{isAuthenticated ? (
							<div className="ml-10 space-x-4">
								<Menu as="div" className="relative z-50 inline-block text-left">
									<div>
										<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
											Settings
											<ChevronDownIcon
												className="-mr-1 ml-2 h-5 w-5"
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
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
											<div className="px-4 py-3">
												<p className="text-sm">Signed in as</p>
												<p className="text-sm font-medium text-gray-900 truncate">
													{email}
												</p>
											</div>
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
															to="/dashboard"
															className={classNames(
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700',
																'block px-4 py-2 text-sm'
															)}
														>
															Dashboard
														</Link>
													)}
												</Menu.Item>
											</div>
											<div className="py-1">
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
															onClick={() => setOpen(true)}
														>
															Sign out
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						) : (
							<div className="ml-10 space-x-4">
								<Link
									to="/sign-in"
									className="whitespace-nowrap  text-gray-500 hover:text-gray-900"
								>
									Sign in
								</Link>
								<Link
									to="/sign-up"
									className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm  text-white hover:from-purple-700 hover:to-indigo-700"
								>
									Try for free
								</Link>
							</div>
						)}
					</div>
				</div>

				<Transition
					as={Fragment}
					enter="duration-200 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						focus
						className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
					>
						<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
							<div className="pt-5 pb-6 px-5">
								<div className="flex items-center justify-between">
									<div>
										<img
											className="h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
											alt="Workflow"
										/>
									</div>
									<div className="-mr-2">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<span className="sr-only">Close menu</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
							</div>
							<div className="py-6 px-5">
								<div className="grid grid-cols-2 gap-4">
									<a
										href="#"
										className="text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Pricing
									</a>
									<a
										href="#"
										className="text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Partners
									</a>
									<a
										href="#"
										className="text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Company
									</a>
								</div>
								<div className="mt-6">
									<a
										href="#"
										className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
									>
										Sign up
									</a>
									<p className="mt-6 text-center text-base font-medium text-gray-500">
										Existing customer?
										<a href="#" className="text-gray-900">
											Sign in
										</a>
									</p>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
			<ConfirmationModal
				open={open}
				variant="Info"
				title="Logout"
				text="Are you sure you want to logout?"
				buttonText="Yes, sure"
				setOpen={() => setOpen(false)}
				action={handleLogout}
			/>
		</header>
	)
}
export default Header

// Old Header

// <header className="bg-white shadow-sm ">
// 	<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
// 		<div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
// 			<div className="flex items-center">
// 				<Link to="/">
// 					<img
// 						className="hover:opacity-75 hover:ease-in-out"
// 						width="60px"
// 						height="60px"
// 						src={Logo}
// 						alt="Funnelshero - Logo"
// 					/>
// 				</Link>
// 				<div className="hidden ml-10 space-x-8 lg:block">
// 					{navigation.map((link) => (
// 						<a
// 							key={link.name}
// 							href={link.href}
// 							className="text-base font-medium text-gray-900 hover:text-indigo-500"
// 						>
// 							{link.name}
// 						</a>
// 					))}
// 				</div>
// 			</div>
// 			{isAuthenticated ? (
// 				<div className="ml-10 space-x-4">
// 					<Menu as="div" className="relative z-50 inline-block text-left">
// 						<div>
// 							<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
// 								Settings
// 								<ChevronDownIcon
// 									className="-mr-1 ml-2 h-5 w-5"
// 									aria-hidden="true"
// 								/>
// 							</Menu.Button>
// 						</div>

// 						<Transition
// 							as={Fragment}
// 							enter="transition ease-out duration-100"
// 							enterFrom="transform opacity-0 scale-95"
// 							enterTo="transform opacity-100 scale-100"
// 							leave="transition ease-in duration-75"
// 							leaveFrom="transform opacity-100 scale-100"
// 							leaveTo="transform opacity-0 scale-95"
// 						>
// 							<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
// 								<div className="px-4 py-3">
// 									<p className="text-sm">Signed in as</p>
// 									<p className="text-sm font-medium text-gray-900 truncate">
// 										{email}
// 									</p>
// 								</div>
// 								<div className="py-1">
// 									<Menu.Item>
// 										{({active}) => (
// 											<Link
// 												to="#"
// 												className={classNames(
// 													active
// 														? 'bg-gray-100 text-gray-900'
// 														: 'text-gray-700',
// 													'block px-4 py-2 text-sm'
// 												)}
// 											>
// 												Account settings
// 											</Link>
// 										)}
// 									</Menu.Item>
// 									<Menu.Item>
// 										{({active}) => (
// 											<Link
// 												to="#"
// 												className={classNames(
// 													active
// 														? 'bg-gray-100 text-gray-900'
// 														: 'text-gray-700',
// 													'block px-4 py-2 text-sm'
// 												)}
// 											>
// 												Support
// 											</Link>
// 										)}
// 									</Menu.Item>
// 									<Menu.Item>
// 										{({active}) => (
// 											<Link
// 												to="/dashboard"
// 												className={classNames(
// 													active
// 														? 'bg-gray-100 text-gray-900'
// 														: 'text-gray-700',
// 													'block px-4 py-2 text-sm'
// 												)}
// 											>
// 												Dashboard
// 											</Link>
// 										)}
// 									</Menu.Item>
// 								</div>
// 								<div className="py-1">
// 									<Menu.Item>
// 										{({active}) => (
// 											<button
// 												type="submit"
// 												className={classNames(
// 													active
// 														? 'bg-gray-100 text-gray-900'
// 														: 'text-gray-700',
// 													'block w-full text-left px-4 py-2 text-sm'
// 												)}
// 												onClick={() => setOpen(true)}
// 											>
// 												Sign out
// 											</button>
// 										)}
// 									</Menu.Item>
// 								</div>
// 							</Menu.Items>
// 						</Transition>
// 					</Menu>
// 				</div>
// 			) : (
// 				<div className="ml-10 space-x-4">
// 					<Link
// 						to="/sign-up"
// 						className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
// 					>
// 						Try for free
// 					</Link>
// 					<Link
// 						to="/sign-in"
// 						className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
// 					>
// 						Sign in
// 					</Link>
// 				</div>
// 			)}
// 		</div>
// 		<div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
// 			{navigation.map((link) => (
// 				<Link
// 					key={link.name}
// 					to={link.href}
// 					className="text-base font-medium text-white hover:text-indigo-50"
// 				>
// 					{link.name}
// 				</Link>
// 			))}
// 		</div>
// 	</nav>
// 	<ConfirmationModal
// 		open={open}
// 		variant="Info"
// 		title="Logout"
// 		text="Are you sure you want to logout?"
// 		buttonText="Yes, sure"
// 		setOpen={() => setOpen(false)}
// 		action={handleLogout}
// 	/>
// </header>
