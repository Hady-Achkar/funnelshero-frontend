import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
	const navigation = [
		{
			name: 'Terms & Conditions',
			href: '/terms',
		},
		{
			name: 'Privacy Policy',
			href: '/privacy',
		},
	]
	return (
		<footer className="bg-white">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
				<div className="flex justify-center space-x-6 md:order-2">
					{navigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="text-gray-400 hover:text-gray-500"
						>
							{item.name}
						</a>
					))}
				</div>
				<div className="mt-8 md:mt-0 md:order-1">
					<p className="text-center text-base text-gray-400">
						&copy; {new Date().getFullYear()} Funnelshero, Inc. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
export default Footer
