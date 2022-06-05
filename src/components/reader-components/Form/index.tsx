import React, {useCallback, useState} from 'react'
import Cookies from 'universal-cookie'
import InputComponent from './InputComonent'
import Button from '../Button'
import Text from '../Text'
import {ComponentLayout} from '../..'

const defaultProps = {
	padding: ['0', '0', '0', '0'],
	margin: ['0', '0', '0', '0'],
	background: {r: 255, g: 255, b: 255, a: 1},
	color: {r: 0, g: 0, b: 0, a: 1},
	shadow: 0,
	radius: 0,
}
const OptinForm = (props: any) => {
	const cookies = new Cookies()
	const emailAddress = cookies.get('email')
	const {background, color, padding, margin, shadow, radius} = props
	return (
		<ComponentLayout>
			<div
				style={{
					background: `rgba(${Object.values(background)})`,
					color: `rgba(${Object.values(color)})`,
					padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
					margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
					boxShadow:
						shadow === 0
							? 'none'
							: `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
					borderRadius: `${radius}px`,
				}}
			>
				<div className="w-full">
					<div className="bg-white py-8 shadow sm:rounded-lg mt-4 mb-4">
						<form
							className="space-y-6 px-4 py-2"
							action={`https://manager.funnelshero.com/opt-form?targetEmail=${props.targetEmail}?funnelId=${props.funnelId}`}
							method="POST"
						>
							{/* <div>
						<label
							htmlFor="fullname"
							className="block text-sm font-medium text-gray-700"
						>
							Fullname
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Person className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</div>
							<input
								disabled={enabled}
								type="text"
								id="fullname"
								value={optData?.fullname}
								onChange={handleFormChange}
								className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
								placeholder="Mr. Magic"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email Address
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</div>
							<input
								disabled={enabled}
								type="email"
								value={optData?.email}
								onChange={handleFormChange}
								name="email"
								id="email"
								className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
								placeholder="you@example.com"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Phone number
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</div>
							<input
								disabled={enabled}
								type="text"
								value={optData?.phone}
								onChange={handleFormChange}
								id="phone"
								className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10  sm:text-sm border-gray-300 rounded-md"
								placeholder="000-00-0000"
							/>
						</div>
						<div className="mt-3 relative rounded-md shadow-sm">
							<button
								disabled={enabled || isDisabled}
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<ContentEditable
									html={text}
									onChange={handleChange}
									disabled={!enabled}
								/>
							</button>
						</div>
					</div> */}
							<div>{props.linkedComponents['form_title']}</div>
							<div>{props.linkedComponents['input_component1']}</div>
							<div>{props.linkedComponents['input_component2']}</div>
							<div>{props.linkedComponents['input_component3']}</div>
							<div>{props.linkedComponents['submit_button']}</div>
						</form>
					</div>
				</div>
			</div>
		</ComponentLayout>
	)
}

export default OptinForm
