import React, {useCallback} from 'react'
import classNames from 'classnames'
import ComponentLayout from '../../common/ComponentLayout'

export enum IconSize {
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM',
	LARGE = 'LARGE',
}

export type IconProps = {
	src?: string
	size: IconSize
	href: string
}

export const IconsWrapper = ({children, ...props}) => {
	return (
		<div
			title="Icons Container"
			className="w-full my-5 flex justify-around items-center"
			{...props}
		>
			{children}
		</div>
	)
}

export const Icons = (props: any) => {
	const {src, size, href} = props

	const sizer = useCallback(() => {
		switch (size) {
			case IconSize.SMALL:
				return 'small-icon'
			case IconSize.MEDIUM:
				return 'medium-icon'
			case IconSize.LARGE:
				return 'large-icon'
			default:
				return 'medium-icon'
		}
	}, [size])

	return (
		<ComponentLayout>
			<a href={href}>
				<img src={src} alt="Funnelshero-Icon" className={classNames(sizer())} />
			</a>
		</ComponentLayout>
	)
}

export const IconObject = (props) => {
	return (
		<ComponentLayout>
			<div className="flex justify-around items-center">
				{props.linkedNodes['icon_wrapper'].children}
			</div>
		</ComponentLayout>
	)
}
