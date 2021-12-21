import React, {useCallback} from 'react'
import {useEditor, useNode} from '@craftjs/core'
import IconsSettings from './IconsSettings'
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
	const {
		connectors: {connect},
	} = useNode()

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

	const {enabled} = useEditor((state, query) => ({
		enabled: state.options.enabled,
	}))
	return (
		<div ref={connect}>
			<a
				href={href}
				className={enabled ? 'pointer-events-none' : 'pointer-events-auto'}
			>
				<img src={src} alt="Funnelshero-Icon" className={classNames(sizer())} />
			</a>
		</div>
	)
}

Icons.craft = {
	displayName: 'Icon',
	props: {
		src: 'https://images-ext-2.discordapp.net/external/zKY3beS6qB3gQPAb5HCvH-Apyrp5PWEFygiCut97d_E/https/cdn-icons-png.flaticon.com/128/1864/1864640.png',
		size: IconSize.MEDIUM,
		href: 'https://www.google.com',
	},
	related: {toolbar: IconsSettings},
}

export default Icons
