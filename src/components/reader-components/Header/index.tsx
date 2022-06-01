import React from 'react'
import {ILink} from '../../../types'
import {Link} from 'react-router-dom'
import Image from '../Image/index'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import classNames from 'classnames'
interface HeaderProps {
	links: ILink[]
	background: string
	color: string
}
const Header = (props: Partial<HeaderProps>) => {
	const {links, background, color} = props

	return (
		<div
			className="w-full px-2  flex justify-between mb-2 shadow "
			style={{
				background: `rgba(${Object.values(background)})`,
			}}
		>
			<div className="relative h-24 flex justify-between items-center">
				<div className="relative z-10 flex lg:px-0">
					<Image id="logo" width="70px" height="70px" />
				</div>
			</div>
			<nav
				className="py-2 flex space-x-3 justify-between flex-wrap"
				aria-label="Global"
			>
				{links.map((item, index) => (
					<Link
						key={index}
						to={item?.href}
						className={classNames(
							'text-gray-700 pointer-events-auto hover:text-indigo-600 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium underline'
						)}
						style={{
							color: `rgba(${Object.values(color)})`,
						}}
					>
						{item?.title}
					</Link>
				))}
			</nav>
		</div>
	)
}

export default Header
