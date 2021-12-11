import React, {Fragment, useState} from 'react'
import {Dialog, Switch, Transition} from '@headlessui/react'
import {
	BellIcon,
	BriefcaseIcon,
	ChatIcon,
	CogIcon,
	DocumentSearchIcon,
	HomeIcon,
	MenuAlt2Icon,
	QuestionMarkCircleIcon,
	UsersIcon,
	XIcon,
} from '@heroicons/react/outline'
import {SearchIcon} from '@heroicons/react/solid'
import GeneralTab from './GeneralTab'

const navigation = [
	{name: 'Home', href: '#', icon: HomeIcon, current: false},
	{name: 'Jobs', href: '#', icon: BriefcaseIcon, current: false},
	{name: 'Applications', href: '#', icon: DocumentSearchIcon, current: false},
	{name: 'Messages', href: '#', icon: ChatIcon, current: false},
	{name: 'Team', href: '#', icon: UsersIcon, current: false},
	{name: 'Settings', href: '#', icon: CogIcon, current: true},
]
const secondaryNavigation = [
	{name: 'Help', href: '#', icon: QuestionMarkCircleIcon},
	{name: 'Logout', href: '#', icon: CogIcon},
]
const tabs = [
	{name: 'General', href: '#', current: true},
	{name: 'Password', href: '#', current: false},
	{name: 'Notifications', href: '#', current: false},
	{name: 'Plan', href: '#', current: false},
	{name: 'Billing', href: '#', current: false},
	{name: 'Team Members', href: '#', current: false},
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const AccountSettings = () => {
	return (
		<>
			<main className="flex-1">
				<div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
					<div className="pt-10 pb-16">
						<div className="px-4 sm:px-6 md:px-0">
							<h1 className="text-3xl font-extrabold text-gray-900">
								Settings
							</h1>
						</div>
						<div className="px-4 sm:px-6 md:px-0">
							<div className="py-6">
								{/* Tabs */}
								<div className="lg:hidden">
									<label htmlFor="selected-tab" className="sr-only">
										Select a tab
									</label>
									<select
										id="selected-tab"
										name="selected-tab"
										className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
										defaultValue={tabs.find((tab) => tab.current).name}
									>
										{tabs.map((tab) => (
											<option key={tab.name}>{tab.name}</option>
										))}
									</select>
								</div>
								<div className="hidden lg:block">
									<div className="border-b border-gray-200">
										<nav className="-mb-px flex space-x-8">
											{tabs.map((tab) => (
												<a
													key={tab.name}
													href={tab.href}
													className={classNames(
														tab.current
															? 'border-purple-500 text-purple-600'
															: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
														'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
													)}
												>
													{tab.name}
												</a>
											))}
										</nav>
									</div>
								</div>
								<GeneralTab />
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default AccountSettings
