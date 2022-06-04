import React from 'react'
import {ComponentLayout} from '../..'

const Image = (props: any) => {
	const {src, alt, width, height, margin, shadow, radius, padding} = props

	return (
		<ComponentLayout>
			<div className="w-full flex justify-center">
				<img
					className="object-cover group-hover:opacity-75  aspect-h-10 aspect-w-10 rounded text-center"
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
		</ComponentLayout>
	)
}

export default Image
