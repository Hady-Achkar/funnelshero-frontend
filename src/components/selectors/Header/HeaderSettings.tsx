import {useNode} from '@craftjs/core'
import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ToolbarItem, ToolbarSection} from '../..'
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
								className="bg-indigo-50 mb-4 w-full hover:bg-indigo-100 text-indigo-900 py-2 px-2 rounded text-sm font-medium cursor-pointer"
								key={index}
								onClick={() => setProp((props) => (props.links = item?.links))}
							>
								{item?.title}
							</div>
						)
					})}

				<div className="w-full"></div>
			</ToolbarSection>
			<ToolbarSection
				title="Colors"
				props={['background', 'color']}
				summary={({background, color}: any) => {
					return (
						<div className="flex flex-row-reverse">
							<div
								style={{
									background:
										background && `rgba(${Object.values(background)})`,
								}}
								className="shadow-md flex-end w-6 h-6 text-center flex items-center rounded-full bg-black"
							>
								<p
									style={{
										color: color && `rgba(${Object.values(color)})`,
									}}
									className="text-white w-full text-center"
								>
									T
								</p>
							</div>
						</div>
					)
				}}
			>
				<ToolbarItem
					full={true}
					propKey="background"
					type="bg"
					label="Background"
				/>
				<ToolbarItem full={true} type="color" label="Text" propKey="color" />
			</ToolbarSection>
		</div>
	)
}

export default HeaderSettings
