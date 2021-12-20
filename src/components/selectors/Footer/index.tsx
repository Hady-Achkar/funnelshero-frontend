import {useNode, Element} from '@craftjs/core'
import React from 'react'
import {ILink, IMenu} from '../../../types'
import FooterSettings from './FooterSettings'
import Icon from '../Icons/index'
interface FooterProps {
	links: ILink[]
	brand: string
	facebook: string
	instagram: string
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
										className="text-base text-gray-500 hover:text-gray-900"
									>
										{item.title}
									</a>
								</div>
							))}
					</nav>
					<div className="mt-8 flex justify-center space-x-6">
						<Element is={Icon} id="social_icon" />
						<Element is={Icon} id="social_icon1" />
						<Element is={Icon} id="social_icon2" />
						<Element is={Icon} id="social_icon3" />
						<Element is={Icon} id="social_icon4" />
					</div>
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
