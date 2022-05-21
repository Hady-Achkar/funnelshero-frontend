import React from 'react'
import {Element, useNode} from '@craftjs/core'
import Icons, {IconSize} from '../../Icons'
import InputSettings from './InputSettings'

const defaultProps = {
	label: 'form label',
	type: 'text',
	value: '',
	id: '',
	onChange: () => {},
	placeholder: 'placeholder..',
	className: '',
	iconSrc: '',
}
const InputComponent = (props) => {
	const {
		connectors: {connect},
	} = useNode()
	const {
		label,
		iconSrc,
		disabled,
		name,
		type,
		value,
		id,
		onChange,
		placeholder,
		className,
	} = props
	return (
		<div ref={connect}>
			<div>
				<label htmlFor={id} className="block text-sm font-medium text-gray-700">
					{label}
				</label>
				<div className="mt-1 relative rounded-md shadow-sm">
					<div className="p-5 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<img src={iconSrc} alt="Funnelshero-Icon" className="small-icon" />
					</div>
					<input
						type={type}
						name={name}
						id={id}
						value={value}
						onChange={onChange}
						className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
						placeholder={placeholder}
					/>
				</div>
			</div>
		</div>
	)
}

InputComponent.craft = {
	props: defaultProps,
	related: {toolbar: InputSettings},
}

export default InputComponent
