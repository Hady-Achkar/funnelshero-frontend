import {Grid, Divider} from '@material-ui/core'
import React, {useCallback, useMemo} from 'react'
import classname from 'classnames'
import {useNode} from '@craftjs/core'

export interface ButtonsGroupProps {
	title: string
	children: React.ReactNode
}

export interface ButtonGroupItemProps {
	id?: string
	onClick?: (args: any) => void
	align: 'left' | 'middle' | 'right'
	title?: string
	name?: string
	className?: string
	disabled?: boolean
}

const ButtonsGroup = (props: ButtonsGroupProps) => {
	const {title, children} = props
	return (
		<div className="px-2 w-full">
			{title && (
				<h5 className="text-sm text-gray-600  font-medium text-dark-gray">
					{title}
				</h5>
			)}
			<div style={{padding: '14px 14px 14px 14px'}}>
				<span className="relative z-0 inline-flex  rounded-md">{children}</span>
			</div>
		</div>
	)
}
const Item = function (props: ButtonGroupItemProps) {
	const {setProp} = useNode()
	const handleClick = useCallback(
		(event) => {
			setProp((innerProps: any) => {
				innerProps[event.target.name] = event.target.id
			})
		},
		[setProp]
	)
	const {id, align, onClick, title, name, className, disabled = false} = props
	const renderEdges = useCallback(() => {
		switch (align) {
			case 'left':
				return 'rounded-l-md'
			case 'middle':
				return '-ml-px'
			case 'right':
				return 'rounded-r-md'
			default:
				return '-ml-px'
		}
	}, [align])
	return (
		<button
			type="button"
			id={id}
			name={name}
			onClick={onClick ? onClick : handleClick}
			disabled={disabled}
			className={classname(
				renderEdges(),
				className,
				'relative inline-flex items-center px-4 py-2 border border-indigo-300 bg-white text-sm font-medium text-indigo-900 hover:bg-indigo-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
			)}
		>
			{title}
		</button>
	)
}
ButtonsGroup.Item = Item
export default ButtonsGroup
