import {useNode} from '@craftjs/core'
import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppState} from '../../../reducers'
import {IFunnel} from '../../../types'
import {useParams, useHistory} from 'react-router-dom'
import {ToolbarItem, ToolbarSection} from '../..'

const FooterSettings = () => {
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

	return (
		<>
			<ToolbarSection title="Menus">
				{funnelState?.menus.length > 0 &&
					funnelState?.menus.map((item) => {
						return (
							<div
								key={item?._id}
								className="bg-indigo-50 mb-4 w-full hover:bg-indigo-100 text-indigo-900 py-2 px-2 rounded text-sm font-medium cursor-pointer"
								onClick={() => setProp((props) => (props.links = item?.links))}
							>
								{item?.title}
							</div>
						)
					})}
			</ToolbarSection>
			<ToolbarSection title="Branding">
				<ToolbarItem type="text" propKey="brand" label="Brand" />
			</ToolbarSection>
			<ToolbarSection title="socials">
				<ToolbarItem type="text" propKey="facebook" label="Facebook" />
				<ToolbarItem type="text" propKey="instagram" label="Instagram" />
			</ToolbarSection>
		</>
	)
}

export default FooterSettings
