import {useNode} from '@craftjs/core'
import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ToolbarSection} from '../..'
import {AppState} from '../../../reducers'
import {IFunnel} from '../../../types'
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
			</ToolbarSection>
		</div>
	)
}

export default HeaderSettings
