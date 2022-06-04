import cx from 'classnames'
import React, {useEffect, useMemo} from 'react'
import Text from '../Text'
import ContentEditable from 'react-contenteditable'
import {Container} from '@material-ui/core'
import {ComponentLayout} from '../..'

export enum ButtonStyle {
	OUTLINED = 'OUTLINED',
	LIGHT = 'LIGHT',
	FILLED = 'FILLED',
}
export enum ButtonSize {
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM',
	LARGE = 'LARGE',
}

export type ButtonProps = {
	background?: Record<'r' | 'g' | 'b' | 'a', number>
	color?: Record<'r' | 'g' | 'b' | 'a', number>
	// margin?: any[]
	text?: string
	textComponent?: any
	variant?: ButtonStyle
	size?: ButtonSize
	type?: 'submit' | 'button'
	href?: string
}

const Button = (props: Partial<ButtonProps>) => {
	const {text, href, textComponent, color, type, variant, size, ...otherProps} =
		props
	const mainClassNames = useMemo(() => {
		switch (variant) {
			case ButtonStyle.OUTLINED:
				return 'inline-flex items-center border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
			case ButtonStyle.LIGHT:
				return 'inline-flex items-center border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
			case ButtonStyle.FILLED:
				return 'inline-flex items-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
			default:
				return 'inline-flex items-center border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
		}
	}, [variant])

	const mainTextSize = useMemo(() => {
		switch (size) {
			case ButtonSize.LARGE:
				return 'text-base'
			case ButtonSize.MEDIUM:
				return 'text-base'
			case ButtonSize.SMALL:
				return 'text-sm'
			default:
				return 'text-base'
		}
	}, [size])
	const buttonStyles = {
		// background:
		// 	variant === ButtonStyle.FILLED
		// 		? `rgba(${props.background.r}, ${props.background.g},${props.background.b},${props.background.a})`
		// 		: variant === ButtonStyle.LIGHT
		// 		? 'rgba(224, 231, 255, 1)'
		// 		: 'transparent',
		// color:
		// 	variant === ButtonStyle.FILLED
		// 		? `rgba(${props.color.r}, ${props.color.g},${props.color.b},${props.color.a})`
		// 		: 'rgba(0, 0, 0, 0.87)',
	}
	const textStyles = {
		// color:
		// 	variant === ButtonStyle.FILLED
		// 		? `rgba(${Object.values(color)})`
		// 		: props.color.r === 255 &&
		// 		  props.color.g === 255 &&
		// 		  props.color.b === 255
		// 		? 'rgba(0, 0, 0, 0.87)'
		// 		: `rgba(${Object.values(color)})`,
		textAlign: 'center',
	}

	const mainSize = useMemo(() => {
		switch (size) {
			case ButtonSize.LARGE:
				return 'px-12 py-3 text-base  w-full'
			case ButtonSize.MEDIUM:
				return 'px-8 py-2 text-base w-1/2'
			case ButtonSize.SMALL:
				return 'px-4 py-1 text-sm w-1/3'
			default:
				return 'px-6 py-3 text-base'
		}
	}, [size])
	return (
		<ComponentLayout>
			<div className="w-full flex  justify-center ">
				{type === 'button' ? (
					<a
						href={href}
						className={cx('w-full', mainClassNames, mainSize)}
						style={buttonStyles}
						{...otherProps}
					>
						<p className="w-full text-center">{text}</p>
					</a>
				) : (
					<a href={href} className="w-full text-center">
						<button
							type={'submit'}
							className={cx('w-full', mainClassNames, mainSize)}
							style={buttonStyles}
							{...otherProps}
						>
							{text}
						</button>
					</a>
				)}
			</div>
		</ComponentLayout>
	)
}

export default Button
