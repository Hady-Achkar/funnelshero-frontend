import React from 'react'
import {ILink, IMenu} from '../../../types'
import Icon from '../Icons/index'
interface FooterProps {
	links: ILink[]
	brand: string
	facebook: string
	instagram: string
}

export const IconsContainer = ({children, ...props}) => {
	return (
		<div
			title="only-buttons"
			{...props}
			className="mt-8 flex justify-center space-x-6"
		>
			{children}
		</div>
	)
}

const FooterComponent = (props: Partial<FooterProps>) => {
	const {links, brand, facebook, instagram} = props
	return (
		<React.Fragment>
			<footer className="bg-white">
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
					<IconsContainer id="icons_container">
						<Icon />
						<Icon />
						<Icon />
						<Icon />
						<Icon />
					</IconsContainer>
					<p className="mt-8 text-center text-base text-gray-400">
						&copy; {new Date().getFullYear()} {brand}, Inc. All rights reserved.
					</p>
				</div>
			</footer>
		</React.Fragment>
	)
}

export default FooterComponent
