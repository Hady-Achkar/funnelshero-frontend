import {useNode} from '@craftjs/core'
import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ToolbarSection} from '../..'
import {AppState} from '../../../reducers'
import {IFunnel} from '../../../types'
import ColorPicker from 'material-ui-color-picker'
const HeaderSettings = () => {
	const {
		actions: {setProp},
	} = useNode()
	const {funnelTitle} = useParams()
	const {funnels} = useSelector((state: AppState) => state.funnels)

	const [funnelState, setFunnelState] = useState<IFunnel>()

	const history = useHistory()
	const fetchFunnel = useCallback(() => {
		const funnel = funnels.find((funnel) => funnel.title === funnelTitle)
		if (!funnel) {
			history.push('/404')
		} else {
			setFunnelState(funnel)
		}
	}, [funnelTitle])
	useEffect(() => {
		fetchFunnel()
		return () => {
			fetchFunnel()
		}
	}, [funnelTitle])

	const [bgColor, setBgColor] = useState<string>('#000')
	const [colorState, setColorState] = useState<string>('#e5e5e5')

	const handleBackgroundChange = (color: string) => {
		setBgColor(color)
		setProp((props) => (props.background = bgColor))
	}

	const handleTextColorChange = (color: string) => {
		setColorState(color)
		setProp((props) => (props.color = colorState))
	}
	return (
		<div>
			<ToolbarSection title="Menus">
				{funnelState?.menus.length > 0 &&
					funnelState?.menus?.map((item, index) => {
						return (
							<div
								className="bg-indigo-50 mb-4"
								key={index}
								onClick={() => setProp((props) => (props.links = item?.links))}
							>
								{item?.title}
							</div>
						)
					})}

				<div className="w-full">
					<ColorPicker
						id="color-picker"
						className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
						hidden
						placeholder="Background color"
						name="color"
						color="primary"
						value={bgColor}
						onChange={handleBackgroundChange}
					/>

					<ColorPicker
						id="color-picker"
						className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
						hidden
						placeholder="Text color"
						name="color"
						color="primary"
						value={colorState}
						onChange={handleTextColorChange}
					/>
				</div>
			</ToolbarSection>
		</div>
	)
}

export default HeaderSettings
