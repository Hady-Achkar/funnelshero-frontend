import {UserComponent, useNode, useEditor} from '@craftjs/core'
import cx from 'classnames'
import React, {useEffect, useMemo} from 'react'
import styled from 'styled-components'
import {ButtonSettings} from './ButtonSettings'
import Text from '../Text'
import ContentEditable from 'react-contenteditable'
import {Container} from '@material-ui/core'

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
	href?: string
	textComponent?: any
	variant?: ButtonStyle
	size?: ButtonSize
}

// const StyledButton = styled.button<ButtonProps>`
// 	background: ${(props) =>
// 		props.buttonStyle === 'full'
// 			? `rgba(${Object.values(props.background)})`
// 			: 'transparent'};
// 	border: 2px solid transparent;
// 	border-color: ${(props) =>
// 		props.buttonStyle === 'outline'
// 			? `rgba(${Object.values(props.background)})`
// 			: 'transparent'};
// 	margin: ${({margin}) =>
// 		`${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
// `

const Button = (props: Partial<ButtonProps>) => {
	const {
		connectors: {connect},
		actions: {setProp},
	} = useNode((node) => ({
		selected: node.events.selected,
	}))

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	const {text, textComponent, href, color, variant, size, ...otherProps} = props
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
	const mainSize = useMemo(() => {
		switch (size) {
			case ButtonSize.LARGE:
				return 'px-6 py-3 text-base'
			case ButtonSize.MEDIUM:
				return 'px-4 py-2 text-base'
			case ButtonSize.SMALL:
				return 'px-2 py-1 text-sm'
			default:
				return 'px-6 py-3 text-base'
		}
	}, [size])
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
		background:
			variant === ButtonStyle.FILLED
				? `rgba(${props.background.r}, ${props.background.g},${props.background.b},${props.background.a})`
				: variant === ButtonStyle.LIGHT
				? 'rgba(224, 231, 255, 1)'
				: 'transparent',
		color:
			variant === ButtonStyle.FILLED
				? `rgba(${props.color.r}, ${props.color.g},${props.color.b},${props.color.a})`
				: 'rgba(0, 0, 0, 0.87)',
	}
	const textStyles = {
		color:
			variant === ButtonStyle.FILLED
				? `rgba(${Object.values(color)})`
				: props.color.r === 255 &&
				  props.color.g === 255 &&
				  props.color.b === 255
				? 'rgba(0, 0, 0, 0.87)'
				: `rgba(${Object.values(color)})`,
		textAlign: 'center',
	}

	console.log(props)

	return (
		<div className="w-full m-2">
			<a
				ref={connect}
				className={cx('w-full', mainClassNames, mainSize)}
				style={buttonStyles}
				{...otherProps}
			>
				<ContentEditable
					html={text}
					tagName="p"
					onChange={(event) => {
						setProp((innerProp) => {
							innerProp.text = event.target.value
						})
					}}
					style={textStyles}
					className={cx('w-full', mainTextSize)}
				/>
			</a>
		</div>
	)
}

Button.craft = {
	displayName: 'Button',
	props: {
		background: {r: 79, g: 70, b: 229, a: 1},
		color: {r: 255, g: 255, b: 255, a: 1},
		text: 'Click me',
		// margin: ['0', '0', '0', '0'],
		variant: ButtonStyle.OUTLINED,
		href: '#',
		size: ButtonSize.LARGE,
		textComponent: {
			...Text.craft.props,
			textAlign: 'center',
		},
	},
	related: {
		toolbar: ButtonSettings,
	},
}
export default Button
