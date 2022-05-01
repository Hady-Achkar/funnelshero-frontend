import React, {useCallback} from 'react'
import classNames from 'classnames'

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

const Icons = (props: Partial<IconProps>) => {
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
		<div>
			<a href={href} className={'pointer-events-auto'}>
				<img src={src} alt="Funnelshero-Icon" className={classNames(sizer())} />
			</a>
		</div>
	)
}

export default Icons
