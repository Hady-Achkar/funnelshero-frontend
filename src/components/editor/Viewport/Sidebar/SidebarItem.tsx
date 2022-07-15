import React from 'react'
import styled from 'styled-components'

const SidebarItemDiv = styled.div<{visible?: boolean; height?: string}>`
	height: ${(props) =>
		props.visible && props.height && props.height !== 'full'
			? `${props.height}`
			: 'auto'};
	flex: ${(props) =>
		props.visible && props.height && props.height === 'full' ? `1` : 'unset'};
`

const Chevron = styled.a<{visible: boolean}>`
	transform: rotate(${(props) => (props.visible ? 180 : 0)}deg);
	svg {
		width: 16px;
		height: 16px;
	}
`

export type SidebarItemProps = {
	title: string
	height?: string
	icon: string
	visible?: boolean
	onChange?: (bool: boolean) => void
}

const HeaderDiv = styled.div`
	color: #615c5c;
	height: 45px;
	svg {
		fill: #707070;
	}
`

export const SidebarItem: React.FC<SidebarItemProps> = ({
	visible,
	icon,
	title,
	children,
	height,
	onChange,
}) => {
	return (
		<SidebarItemDiv
			visible={visible}
			height={height}
			className="flex flex-col  bg-gray-100  shadow-sm mt-2  py-3"
		>
			<HeaderDiv
				className={`rounded flex bg-gray-100 items-center px-2  ${
					visible ? 'shadow-sm' : ''
				}`}
			>
				<div className="flex-1 bg-gray-100 flex items-center">
					{/* {React.createElement(icon, {className: 'w-4 h-4 mr-2'})} */}
					<img className="w-4 h-4 mr-2" src={icon} />
					<h2 className="text-sm text-gray-700">{title}</h2>
				</div>
				<Chevron visible={visible}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="cursor-pointer"
						viewBox="0 0 20 20"
						fill="currentColor"
						onClick={() => {
							if (onChange) onChange(!visible)
						}}
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</Chevron>
			</HeaderDiv>
			{visible ? (
				<div className="w-full flex-1 bg-gray-100 overflow-auto">{children}</div>
			) : null}
		</SidebarItemDiv>
	)
}
