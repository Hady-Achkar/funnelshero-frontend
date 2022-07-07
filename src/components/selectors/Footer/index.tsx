import {useNode, Element} from '@craftjs/core'
import React from 'react'
import {ILink, IMenu} from '../../../types'
import FooterSettings from './FooterSettings'
import {Icons} from '../../selectors'
import Image from '../Image/index'
interface FooterProps {
	links: ILink[]
	brand: string
	facebook: string
	instagram: string
}

export const IconsContainer = ({children, ...props}) => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<div
			title="only-buttons"
			ref={connect}
			{...props}
			className="mt-8 flex justify-center space-x-6"
		>
			{children}
		</div>
	)
}

IconsContainer.craft = {
	displayName: 'Icons space',
	rules: {
		canMoveIn: (nodes) => nodes.data.type === Icons,
	},
}

const FooterComponent = (props: Partial<FooterProps>) => {
	const {
		connectors: {connect},
	} = useNode()
	const {links, brand, facebook, instagram} = props
	return (
		<React.Fragment>
			<footer className="bg-white" ref={connect}>
				<div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
					<nav
						className="-mx-5 -my-2 flex flex-wrap justify-center"
						aria-label="Footer"
					>
						{links?.length > 0 &&
							links.map((item) => (
								<div key={item.title} className="px-5 py-2">
									<a
										href={item.href}
										className="text-base text-gray-500 hover:text-gray-900 underline"
									>
										{item.title}
									</a>
								</div>
							))}
					</nav>
					<Element canvas is={IconsContainer} id="icons_container">
						<Element is={Icons} id="social_Icons" />
						<Element is={Icons} id="social_Icons1" />
						<Element is={Icons} id="social_Icons2" />
						<Element is={Icons} id="social_Icons3" />
						<Element is={Icons} id="social_Icons4" />
					</Element>
					<p className="mt-8 text-center text-base text-gray-400">
						&copy; {new Date().getFullYear()} {brand}, Inc. All rights reserved.
					</p>
				</div>
			</footer>
		</React.Fragment>
	)
}

FooterComponent.craft = {
	displayName: 'Footer',
	props: {
		links: [],
		brand: 'Funnelshero',
		facebook: 'https://www.facebook.com',
		instagram: 'https://www.instagram.com',
	},
	related: {toolbar: FooterSettings},
}

export default FooterComponent
