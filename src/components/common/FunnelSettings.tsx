import React, {useCallback, useEffect} from 'react'
import {Fragment, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/outline'
import classNames from 'classnames'
import {PublishTab, GeneralTab} from './SettingsTabs'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {IFunnel} from '../../types'

const FunnelsSettings = ({open, setOpen}) => {
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

	console.log('funnel state:', funnelState)

	const [tabs, setTabs] = useState([
		{
			name: 'General',
			component: <GeneralTab setOpen={setOpen} open={open} />,
			current: true,
		},
		{
			name: 'Publish',
			component: <PublishTab setOpen={setOpen} open={open} />,
			current: false,
		},
		{name: 'Analytics', component: <div>hello 3</div>, current: false},
		{name: 'Navigation', component: <div>hello 4</div>, current: false},
	])

	const handleToggleTabs = useCallback((index: number) => {
		setTabs((prevState) => [
			...prevState.map((item, i) => {
				return index === i
					? {...item, current: true}
					: {...item, current: false}
			}),
		])
	}, [])
	console.log(tabs)

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={setOpen}
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:my-8 sm:align-middle sm:w-full sm:p-6">
							<div>
								<div className="sm:hidden">
									<label htmlFor="tabs" className="sr-only">
										Select a tab
									</label>
									<select
										id="tabs"
										name="tabs"
										className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
										defaultValue={tabs[0].name}
									>
										{tabs.map((tab) => (
											<option key={tab.name}>{tab.name}</option>
										))}
									</select>
								</div>
								<div className="hidden sm:block">
									<div className="border-b border-gray-200">
										<nav className="-mb-px flex" aria-label="Tabs">
											{tabs.map((tab, index) => (
												<button
													key={tab.name}
													onClick={() => handleToggleTabs(index)}
													className={classNames(
														tab.current
															? 'border-b border-indigo-500 text-indigo-600'
															: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
														'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
													)}
													aria-current={tab.current ? 'page' : undefined}
												>
													{tab.name}
												</button>
											))}
										</nav>
									</div>
								</div>
							</div>
							<div className="mt-5">
								{tabs.find((tab) => tab.current).component}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default FunnelsSettings
