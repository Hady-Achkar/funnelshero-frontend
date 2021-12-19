import {useNode} from '@craftjs/core'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ToolbarSection} from '../../..'
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
			<ToolbarSection title="Navigation">
				<Listbox
					value={selected}
					onChange={(e) => {
						setSelected(e)
						setProp((props) => (props.href = e.link))
					}}
				>
					{({open}) => (
						<>
							<Listbox.Label className="block text-sm font-medium text-gray-700">
								Results
							</Listbox.Label>
							<div className="mt-1 relative">
								<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
									<span className="block truncate">{selected?.title}</span>
									<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
										<SelectorIcon
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</span>
								</Listbox.Button>

								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className=" mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
										{funnelState?.pages.map((page) => (
											<Listbox.Option
												key={page?._id}
												className={({active}) =>
													classNames(
														active
															? 'text-white bg-indigo-600'
															: 'text-gray-900',
														'cursor-default select-none relative py-2 pl-3 pr-9'
													)
												}
												value={page}
											>
												{({selected, active}) => (
													<>
														<span
															className={classNames(
																selected ? 'font-semibold' : 'font-normal',
																'block truncate'
															)}
														>
															{page?.title}
														</span>

														{selected ? (
															<span
																className={classNames(
																	active ? 'text-white' : 'text-indigo-600',
																	'absolute inset-y-0 right-0 flex items-center pr-4'
																)}
															>
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox>
			</ToolbarSection>
		</div>
	)
}

export default QuizzElementSettings
