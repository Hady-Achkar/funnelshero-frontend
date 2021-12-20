import {useNode, Element, useEditor} from '@craftjs/core'
import {Container} from '@material-ui/core'
import React from 'react'
import {ILink} from '../../../types'
import {Link} from 'react-router-dom'
import HeaderSettings from './HeaderSettings'
import Image from '../Image/index'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import classNames from 'classnames'
interface HeaderProps {
	links: ILink[]
}
const Header = (props: Partial<HeaderProps>) => {
	const {links} = props
	const {
		connectors: {connect},
	} = useNode()

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	return (
		<div
			ref={connect}
			className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8 flex justify-between mt-2 shadow"
		>
			<div className="relative h-24 flex justify-between items-center">
				<div className="relative z-10 px-2 flex lg:px-0">
					<Element is={Image} id="logo" width="100px" height="100px" />
				</div>
			</div>
			<nav className="py-2 flex space-x-8" aria-label="Global">
				{links.map((item, index) => (
					<Link
						key={index}
						href={item?.href}
						className={classNames(
							'text-gray-700 hover:text-indigo-600 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium',
							enabled ? 'pointer-events-none' : 'pointer-events-auto'
						)}
					>
						{item?.title}
					</Link>
				))}
			</nav>
		</div>
	)
}

Header.craft = {
	displayName: 'Header',
	props: {
		links: [],
	},
	related: {toolbar: HeaderSettings},
}
export default Header
