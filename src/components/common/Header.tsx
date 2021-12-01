import React, {Fragment, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppState} from '../../reducers'
import Logo from '../../assets/icon-only.png'
import {logoutAction} from '../../actions'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
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
		<header className="bg-white shadow-sm ">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
					<div className="flex items-center">
						<Link to="/">
							<img
								className="hover:opacity-75 hover:ease-in-out"
								width="60px"
								height="60px"
								src={Logo}
								alt="Funnelshero - Logo"
							/>
						</Link>
						<div className="hidden ml-10 space-x-8 lg:block">
							{navigation.map((link) => (
								<a
									key={link.name}
									href={link.href}
									className="text-base font-medium text-gray-900 hover:text-indigo-500"
								>
									{link.name}
								</a>
							))}
						</div>
					</div>
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
								to="/sign-up"
								className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
							>
								Try for free
							</Link>
							<Link
								to="/sign-in"
								className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
							>
								Sign in
							</Link>
						</div>
					)}
				</div>
				<div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
					{navigation.map((link) => (
						<Link
							key={link.name}
							to={link.href}
							className="text-base font-medium text-white hover:text-indigo-50"
						>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
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
