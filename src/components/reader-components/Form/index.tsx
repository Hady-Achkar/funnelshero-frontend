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
							action={`https://manager.funnelshero.com/opt-form?targetEmail=${props.targetEmail}&funnelId=${props.funnelId}`}
							method="POST"
						>
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
