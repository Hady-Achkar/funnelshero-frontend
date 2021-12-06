import React from 'react'
import {Tooltip} from '@material-ui/core'
import {Element, useEditor} from '@craftjs/core'

interface IProps {
	title: string
	component: typeof Element
	Icon: any
	isCanva: boolean
}
const ToolboxItem: React.FC<IProps> = (props) => {
	const {title, component, Icon, isCanva} = props
	const {
		connectors: {create},
	} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))
	return (
		<div
			className="w-full p-3 rounded-md text-xs font-medium divide-y divide-gray-200"
			ref={(ref) => create(ref, <Element canvas={isCanva} is={component} />)}
			role="list"
		>
			<Tooltip title={title} placement="right">
				<div className="group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white cursor-move">
					<Icon className="h-8 w-8  " />
					{title}
				</div>
			</Tooltip>
		</div>
	)
}

export default ToolboxItem
