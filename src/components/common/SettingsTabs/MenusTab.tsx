import React, {SetStateAction, useCallback, useEffect, useState} from 'react'

import {IFunnel} from '../../../types'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {AppState} from '../../../reducers'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface IProps {
	open: boolean
	setOpen: React.Dispatch<SetStateAction<boolean>>
}

type Params = {
	funnelTitle: string
}
const MenusTab: React.FC<IProps> = (props) => {
	const {open, setOpen} = props
	const dispatch = useDispatch()
	const {funnelTitle} = useParams<Params>()
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
	}, [funnelTitle, funnels])
	useEffect(() => {
		fetchFunnel()
		return () => {
			fetchFunnel()
		}
	}, [funnelTitle, funnels])

	// const handleChange = useCallback(
	// 	(event: React.ChangeEvent<HTMLInputElement>) => {
	// 		setFunnelState((prevState) => ({
	// 			...prevState,
	// 			[event.target.id]: event.target.value,
	// 		}))
	// 	},
	// 	[]
	// )

	const [expanded, setExpanded] = React.useState<number | false>(9999999999)

	const handleChange = (panel: number) => {
		panel === expanded ? setExpanded(false) : setExpanded(panel)
	}

	console.log(expanded)

	const whatever = [1, 2, 3]
	return (
		<div style={{minHeight: '70vh'}}>
			<ul role="list" className="space-y-2 divide-y divide-gray-200">
				{funnelState?.menus?.map((item, index) => {
					return (
						<li key={index} className="block">
							<div className="px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-50">
								<div
									className="flex items-center justify-between "
									onClick={() => handleChange(index)}
								>
									<p className="text-sm font-medium text-gray-600 truncate">
										{item?.title}
									</p>
									{expanded !== index ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 text-gray-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
												clipRule="evenodd"
											/>
										</svg>
									)}
								</div>
							</div>
							<div className={expanded === index ? 'block' : 'hidden'}>
								{item?.links?.map((link, index) => {
									return (
										<>
											<div className="mt-1 px-4">
												<input
													key={index}
													value={link?.title}
													className=" py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  border-gray-500 rounded-md"
												/>
											</div>
										</>
									)
								})}
								<div className="border-t divide-gray-200 py-4">
									<p className="px-4 text-gray-700 font-medium">
										Create a link
									</p>
									<div className="flex justify-start items-center bg-50 space-x-3 px-6 ">
										<div className="mt-1">
											<label
												htmlFor="pages"
												className="block text-sm font-medium text-gray-500"
											>
												Link title
											</label>
											<input
												type="text"
												name="title"
												id="title"
												className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
										<div className="mt-1">
											<label
												htmlFor="pages"
												className="block text-sm font-medium text-gray-500"
											>
												Page
											</label>
											<select
												id="pages"
												name="pages"
												className="block w-full pl-3 pr-10  text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
												defaultValue="Canada"
											>
												{funnelState?.pages &&
													funnelState?.pages.map((page) => {
														return <option key={page?._id}>{page.title}</option>
													})}
											</select>
										</div>
									</div>
									<div className="mt-1">
										<p className="px-6 py-4 text-sm font-medium text-gray-600 truncate">
											Add
										</p>
									</div>
								</div>
							</div>
						</li>
					)
				})}
				<li className="block">
					<div className="flex justify-end px-4 py-4 sm:px-6 bg-gray-50">
						<button
							type="button"
							className="inline-flex items-center  px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Add a new menu
						</button>
					</div>
				</li>
			</ul>
		</div>
	)
}

export default MenusTab
