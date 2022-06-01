import React from 'react'

const ToolbarDropdown = ({title, value, onChange, children}: any) => {
	return (
		<select
			className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			{children}
		</select>
	)
}
export default ToolbarDropdown
