import {useNode} from '@craftjs/core'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ToolbarItem, ToolbarSection} from '../../..'
import {AppState} from '../../../../reducers'
import {IFunnel} from '../../../../types'
const QuizzElementSettings = () => {
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

	const [selected, setSelected] = useState(funnelState?.pages[0])

	const {
		actions: {setProp},
	} = useNode()
	return (
		<div>
			<div className="px-2 w-full">
				<h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
					Go to
				</h5>
				<div className="px-2">
					<ToolbarItem type="select" propKey="href" label="test">
						{funnelState?.pages.map((item, index) => {
							return (
								<option value={item?.link} key={index}>
									{item?.title}
								</option>
							)
						})}
					</ToolbarItem>
				</div>
			</div>
		</div>
	)
}

export default QuizzElementSettings
