import React, {useCallback} from 'react'
import classNames from 'classnames'
import ComponentLayout from '../../common/ComponentLayout'

export const CheckboxContainer = ({children, ...props}) => {
	return (
		<div title="Checkbox Container" className="space-y-6 my-5" {...props}>
			{children}
		</div>
	)
}
export const CheckboxItem = (props: any) => {
	return (
		<ComponentLayout>
			<div className="relative flex items-center justify-between py-4 px-8 rounded-full border border-gray-200 mx-4">
				<div className="flex items-center h-5">
					<input
						id="comments"
						aria-describedby="comments-description"
						name="comments"
						type="checkbox"
						className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
					/>
				</div>
				<div className="ml-3 text-sm flex items-center justify-between">
					{props.linkedNodes['cb_title']}
				</div>
				<img
					src={props.src}
					className="rounded cursor-pointer hover:border-indigo-500 large-icon"
				/>
			</div>
		</ComponentLayout>
	)
}

export const CheckboxComponent = (props) => {
	return (
		<ComponentLayout>
			<div className="flex justify-around items-center">
				{props.linkedNodes['checkbox_container'].children}
			</div>
		</ComponentLayout>
	)
}
