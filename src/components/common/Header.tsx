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
	{name: 'Pricing', href: '/bundles'},
	{name: 'About', href: '/about'},
	{name: 'Contact', href: '/contact'},
	{name: 'Case Study', href: '/case-study'},
	{name: 'Checkout', href: '/checkout'},
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
		<header className="py-6 bg-gray-50">
			<Popover>
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<nav
						className="relative flex items-center justify-between sm:h-10 md:justify-center"
						aria-label="Global"
					>
						<div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
							<div className="flex items-center justify-between w-full md:w-auto">
								<a href="#">
									<span className="sr-only">Workflow</span>
									<img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
								</a>
								<div className="-mr-2 flex items-center md:hidden">
									<Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Open main menu</span>
										<MenuIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
						</div>
						<div className="hidden md:flex md:space-x-10">
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="font-medium text-gray-500 hover:text-gray-900"
								>
									{item.name}
								</a>
							))}
						</div>
						<div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0 space-x-2">
							<span className="inline-flex rounded-md shadow">
								<Link
									to="/sign-in"
									className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
								>
									Sign in
								</Link>
							</span>
							<span className="inline-flex rounded-md shadow">
								<Link
									to="/bundles"
									className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
								>
									Try for free
								</Link>
							</span>
						</div>
					</nav>
				</div>

				<Transition
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						focus
						className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
					>
						<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
							<div className="px-5 pt-4 flex items-center justify-between">
								<div>
									<img className="h-8 w-auto" src={Logo} alt="" />
								</div>
								<div className="-mr-2">
									<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Close menu</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							<div className="px-2 pt-2 pb-3">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
									>
										{item.name}
									</a>
								))}
							</div>
							<Link
								href="/sign-in"
								className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
							>
								Sign in
							</Link>
							<Link
								href="/sign-in"
								className="block w-full px-5 py-3 text-center font-medium text-gray-50 bg-indigo-600 hover:bg-gray-100"
							>
								Try for free
							</Link>
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
