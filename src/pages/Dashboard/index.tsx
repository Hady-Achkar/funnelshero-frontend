import React, {useCallback, useEffect, useState} from 'react'
import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {DotsVerticalIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {getMyFunnels, GetMyFunnels} from '../../services'
import {Loading, NewFunnelModal, Wrapper} from '../../components'
import {MainFooter} from '../../components'
import {MainHeader} from '../../components'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {startAddFunnel, startInitializeMyFunnels} from '../../actions'
import {AppState} from '../../reducers'

import {
	CalendarIcon,
	LocationMarkerIcon,
	UsersIcon,
} from '@heroicons/react/solid'
import {Container} from '@material-ui/core'
import moment from 'moment'

const positions = [
	{
		id: 1,
		title: 'Back End Developer',
		type: 'Full-time',
		location: 'Remote',
		department: 'Engineering',
		closeDate: '2020-01-07',
		closeDateFull: 'January 7, 2020',
	},
	{
		id: 2,
		title: 'Front End Developer',
		type: 'Full-time',
		location: 'Remote',
		department: 'Engineering',
		closeDate: '2020-01-07',
		closeDateFull: 'January 7, 2020',
	},
	{
		id: 3,
		title: 'User Interface Designer',
		type: 'Full-time',
		location: 'Remote',
		department: 'Design',
		closeDate: '2020-01-14',
		closeDateFull: 'January 14, 2020',
	},
]

const Dashboard: React.FC = () => {
	const [open, setOpen] = useState(false)
	const {funnels, loading} = useSelector((state: AppState) => state.funnels)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(startInitializeMyFunnels())
	}, [])
	const handleAddNewFunnel = useCallback(() => {
		setOpen(true)
		// dispatch(startAddFunnel({category: 'category', title: 'title'}))
	}, [])

	return (
		<React.Fragment>
			<MainHeader />
			<Wrapper loading={loading}>
				<div className="bg-white  py-9" style={{minHeight: '86vh'}}>
					<Container>
						<div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								My Funnels
							</h3>
							<div className="mt-3 sm:mt-0 sm:ml-4">
								<button
									type="button"
									className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={handleAddNewFunnel}
								>
									Create New Funnel
								</button>
							</div>
						</div>

						<div className="flex flex-col">
							<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
									<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Title
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Base Domain
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Number of pages
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Contact Email
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Status
													</th>
													<th scope="col" className="relative px-6 py-3">
														<span className="sr-only">Edit</span>
													</th>
												</tr>
											</thead>
											<tbody>
												{funnels.map((item, index) => (
													<tr
														key={item._id}
														className={
															index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
														}
													>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer">
															{item.title}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{item.baseDomain}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{item.pages.length} pages
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{item.contactEmail}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																Active
															</span>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 text-gray-500 hover:text-gray-600 cursor-pointer "
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
																/>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																/>
															</svg>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</div>
			</Wrapper>
			<NewFunnelModal open={open} setOpen={setOpen} />
		</React.Fragment>
	)
}

export default Dashboard
