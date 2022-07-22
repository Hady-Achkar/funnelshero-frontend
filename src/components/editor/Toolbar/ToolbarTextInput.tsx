import {QuestionMarkCircleIcon} from '@heroicons/react/solid'
import {TextField, makeStyles, InputAdornment} from '@material-ui/core'
import {IconButton} from '@mui/material'
import React, {useEffect} from 'react'
import {useState} from 'react'
import {ChromePicker} from 'react-color'
import SaveIcon from '@mui/icons-material/Save'
const useStyles = makeStyles({
	root: {
		padding: 0,
		width: '100%',
		// background:"#efeff1",
		// borderRadius: '100px',
		border: 'none',
		margin: 0,
		marginTop: 0,
		position: 'relative',
		borderRadius: '15px',
	},
	input: {
		background: 'rgb(238,242,255)',
		borderColor: '#101010',
		// borderRadius: '15px',
		fontSize: '12px',
		paddingLeft: '10px',
		paddingBottom: '8px',
		paddingTop: '8px',
		margin: 0,
		"&:focus": {
			border: "none",
			outline: "none",
			outlineOffset: "0px",
			boxShadow: "none"
		}
	}, // a style rule
	// notchedOutline: {
	//   borderColor:'transparent',
	//   borderRadius: "100px"
	// }

})

const useLabelStyles = makeStyles({
	root: {
		color: 'rgb(128,128,128)',
	},
	formControl: {
		transform: 'scale(1) !important',
		width: '100%',
		fontSize: '13px',
		// borderRadius: '15px',
		paddingLeft: '10px',
		paddingTop: '9px',
		paddingBottom: '9px',
		// marginBottom: '3px',
		position: 'relative',
		// left: '-12px',
		background: '#fff',
	}, // a style rule
})

export type ToolbarTextInputProps = {
	prefix?: string
	label?: string
	type: string
	onChange?: (value: any) => void
	value?: any
}
const ToolbarTextInput = ({
	onChange,
	value,
	prefix,
	label,
	type,
	...props
}: ToolbarTextInputProps) => {
	const [internalValue, setInternalValue] = useState(value)
	const [active, setActive] = useState(false)
	const classes = useStyles({})
	const labelClasses = useLabelStyles({})
	useEffect(() => {
		let val = value
		if (type === 'color' || type === 'bg') val = `rgba(${Object.values(value)})`
		setInternalValue(val)
	}, [value, type])

	return (
		<div
			style={{width: '100%', position: 'relative'}}
			onClick={() => {
				setActive(true)
			}}
		>
			{(type === 'color' || type === 'bg') && active ? (
				<div
					className="absolute"
					style={{
						zIndex: 99999,
						top: 'calc(100% + 10px)',
						left: '-5%',
					}}
				>
					<div
						className="fixed top-0 left-0 w-full h-full cursor-pointer"
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							setActive(false)
						}}
					></div>
					<ChromePicker
						color={value}
						onChange={(color: any) => {
							onChange(color.rgb)
						}}
					/>
				</div>
			) : null}
			<TextField
				label={label}
				style={{margin: 0, width: '100%'}}
				value={internalValue || ''}
				className="focus:ring-indigo-500  focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm w-ful text_field-dev"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						onChange((e.target as any).value)
					}
				}}
				onChange={(e) => {
					setInternalValue(e.target.value)
				}}
				margin="dense"
				variant="filled"
				InputProps={{
					classes,
					disableUnderline: true,
					startAdornment: ['color', 'bg'].includes(type) ? (
						<InputAdornment
							position="start"
							style={{
								position: 'absolute',
								marginTop: '2px',
								marginRight: '8px',
							}}
						>
							<div
								className="w-2 h-2 inline-block relative"
								style={{
									left: '15px',
									background: internalValue,
								}}
							/>
						</InputAdornment>
					) : null,
				}}
				InputLabelProps={{
					classes: {
						...labelClasses,
					},
					shrink: true,
				}}
				{...props}
			/>
		</div>
	)
}
export default ToolbarTextInput
