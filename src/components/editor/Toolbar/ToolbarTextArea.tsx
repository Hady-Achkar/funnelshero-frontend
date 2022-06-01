import {TextField, makeStyles, InputAdornment} from '@material-ui/core'
import React, {useEffect} from 'react'
import {useState} from 'react'
import {ChromePicker} from 'react-color'

export type ToolbarTextAreaProps = {
	prefix?: string
	label?: string
	type: string
	onChange?: (value: any) => void
	value?: any
}
const ToolbarTextArea = ({
	onChange,
	value,
	prefix,
	label,
	type,
	...props
}: ToolbarTextAreaProps) => {
	const [internalValue, setInternalValue] = useState(value)
	const [active, setActive] = useState(false)
	useEffect(() => {
		let val = value
		setInternalValue(val)
	}, [value])

	return (
		<div
			style={{width: '100%', position: 'relative'}}
			onClick={() => {
				setActive(true)
			}}
		>
			<textarea
				rows={4}
				value={internalValue || ''}
				className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				defaultValue={''}
				style={{margin: 0, width: '100%'}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						onChange((e.target as any).value)
					}
				}}
				onChange={(e) => {
					setInternalValue(e.target.value)
				}}
			/>
		</div>
	)
}
export default ToolbarTextArea
