import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'

import {useParams, useHistory} from 'react-router-dom'
import {AppState} from '../../../reducers'
import {IFunnel} from '../../../types'

const PublishTab = ({open, setOpen}) => {
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
			<form className="space-y-8 divide-y divide-gray-200">
				<div
					className="space-y-8 divide-y divide-gray-200 sm:space-y-5"
					style={{minHeight: '60vh'}}
				>
					<div className="space-y-6 sm:space-y-5">
						<div className="space-y-6 sm:space-y-5">
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
								<label
									htmlFor="domain"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Domain name
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div className="max-w-lg flex rounded-md shadow-sm">
										<input
											type="text"
											name="domain"
											value={funnelState?.proDomain}
											disabled
											id="domain"
											autoComplete="domain"
											className="flex-1 block w-full  bg-gray-50 text-gray-500 min-w-0 rounded sm:text-sm border-gray-300"
										/>
									</div>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="domain"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Subdomain
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div className="max-w-lg flex rounded-md shadow-sm">
										<input
											type="text"
											name="subdomain"
											value={funnelState?.baseDomain}
											disabled
											id="subdomain"
											autoComplete="subdomain"
											className="flex-1 block w-full  bg-gray-50 text-gray-500 min-w-0 rounded sm:text-sm border-gray-300"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="pt-5 ">
					<div className="flex h-full justify-end items-end">
						<button
							type="button"
							className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={() => setOpen(false)}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
export default PublishTab
