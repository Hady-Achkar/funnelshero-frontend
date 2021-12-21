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
	background: string
	color: string
}
const Header = (props: Partial<HeaderProps>) => {
	const {links, background, color} = props
	const {
		connectors: {connect},
	} = useNode()

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	return (
		<div
			ref={connect}
			className="w-full px-2  flex justify-between mb-2 shadow "
			style={{
				background: `rgba(${Object.values(background)})`,
			}}
		>
			<div className="relative h-24 flex justify-between items-center">
				<div className="relative z-10 flex lg:px-0">
					<Element is={Image} id="logo" width="70px" height="70px" />
				</div>
			</div>
			<nav
				className="py-2 flex space-x-3 justify-between flex-wrap"
				aria-label="Global"
			>
				{links.map((item, index) => (
					<Link
						key={index}
						href={item?.href}
						className={classNames(
							'text-gray-700 hover:text-indigo-600 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium underline',
							enabled
								? 'pointer-events-none'
								: 'pointer-events-auto hover:text-indigo-600'
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

Header.craft = {
	displayName: 'Header',
	props: {
		links: [],
		background: {r: 255, g: 255, b: 255, a: 1},
		color: {r: 0, g: 0, b: 0, a: 1},
	},
	related: {toolbar: HeaderSettings},
}
export default Header
