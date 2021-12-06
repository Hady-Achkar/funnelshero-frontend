import React, {useCallback, useState} from 'react'
import {useNode} from '@craftjs/core'
import {Slider} from '@material-ui/core'
import {ToolbarSection, ToolbarItem} from '../../editor'
import {ButtonsGroup} from '../../editor'
const DividerSettings = () => {
	const [sliderValue, setSliderValue] = useState<string>('30')
	const {
		actions: {setProp},
	} = useNode()
	const handleChangeMargin = useCallback(
		(_, value: number) => {
			setProp((innerProps: any) => {
				innerProps.marginVertical[0] = `${value / 2}px`
				innerProps.marginVertical[1] = `${value / 2}px`
			}, 1000)
			setSliderValue(value.toString())
		},
		[setProp]
	) as any
	const handleChangeThicknes = useCallback(
		(event) => {
			setProp((innerProps: any) => {
				innerProps.thick =
					event.target.id === 'NARROW'
						? (innerProps.thick = false)
						: (innerProps.thick = true)
			}, 1000)
		},
		[setProp]
	)
	return (
		<React.Fragment>
			<ToolbarSection
				title="Margin"
				props={['marginVertical']}
				summary={({marginVertical}: any) => {
					return `${marginVertical[0] || 0} ${marginVertical[1] || 0}`
				}}
			>
				<Slider
					step={10}
					min={20}
					max={100}
					value={parseInt(sliderValue) || 0}
					onChange={handleChangeMargin}
					className="text-indigo-600"
				/>
			</ToolbarSection>
			{/* <ToolbarSection title="Height" props={['thick']}>
				<span className="relative z-0 inline-flex shadow-sm rounded-md">
					<button
						type="button"
						id="THICK"
						className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
						onClick={handleChangeThicknes}
					>
						Thick
					</button>

					<button
						type="button"
						onClick={handleChangeThicknes}
						id="NARROW"
						className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
					>
						Narrow
					</button>
				</span>
			</ToolbarSection> */}
			<ButtonsGroup title="Height">
				<ButtonsGroup.Item
					title="Thick"
					onClick={handleChangeThicknes}
					id="THICK"
					align="left"
				/>
				<ButtonsGroup.Item
					title="Narrow"
					onClick={handleChangeThicknes}
					id="NARROW"
					align="right"
				/>
			</ButtonsGroup>
		</React.Fragment>
	)
}

export default DividerSettings
