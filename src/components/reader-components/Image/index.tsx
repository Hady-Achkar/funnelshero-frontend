import React from 'react'

const defaultProps = {
	padding: ['10', '10', '10', '10'],
	margin: ['10', '10', '10', '10'],
	background: {r: 255, g: 255, b: 255, a: 1},
	color: {r: 0, g: 0, b: 0, a: 1},
	shadow: 0,
	radius: 0,
	src: 'https://images.unsplash.com/photo-1613685106114-63a60f4aa467?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80',
	height: '400px',
	width: '100%',
}

const Image = (props: any) => {
	const {src, alt, width, height, margin, shadow, radius, padding} = props

	return (
		<div className="w-full flex justify-center">
			<img
				className="object-cover  group-hover:opacity-75  aspect-h-10 aspect-w-10 rounded text-center"
				src={src}
				alt={alt}
				style={{
					width: width,
					height: height,
					borderRadius: `${radius}px`,
					boxShadow:
						shadow === 0
							? 'none'
							: `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
				}}
			/>
		</div>
	)
}

export default Image
