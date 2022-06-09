import React, {SetStateAction, useCallback, useEffect, useState} from 'react'
import {IFunnel} from '../../../types'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {AppState} from '../../../reducers'
import {AccordionComponent} from '../..'
import {PlusSmIcon} from '@heroicons/react/solid'
import AddHeaderMenuModal from './AddHeaderMenuModal'
import AddFooterMenuModal from './AddFooterMenuModal'
import {startDeleteMenu} from '../../../actions'
import ConfirmationModal from '../ConfirmationModal'
import {getOptSubmits} from '../../../services'
import {ISubmit} from '../../../services/GetSubmits'
import * as XLSX from 'xlsx'
import moment from 'moment'

interface IProps {
	open: boolean
	setOpen: React.Dispatch<SetStateAction<boolean>>
}

type Params = {
	funnelTitle: string
}

type ExcelData = {
	Name: String
	EmailAddress: String
	PhoneNumber: String
	Date: String
}
const AnalysisTab: React.FC<IProps> = () => {
	const {funnelTitle} = useParams<Params>()
	const {funnels} = useSelector((state: AppState) => state.funnels)
	const funnelId = funnels.find((funnel) => funnel.title === funnelTitle)._id
	const [submits, setSubmits] = useState<ISubmit[]>()

	useEffect(() => {
		getOptSubmits(funnelId)
			.then((res) => {
				setSubmits(res.data.submits)
				console.log(res.data.submits)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	const handleExportToSheets = () => {
		let dataArray: ExcelData[] = []

		submits.forEach((item) => {
			dataArray.push({
				Name: item.fullname,
				EmailAddress: item.email,
				PhoneNumber: item.phone,
				Date: moment(item.createdAt).format('DD/MM/YY'),
			})
		})
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(dataArray)

		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
		XLSX.writeFile(wb, 'MYEXCEL.xlsx')
	}

	return (
		<div style={{minHeight: '70vh'}}>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="mt-4 sm:mt-0 sm:flex-none">
						<button
							type="button"
							onClick={handleExportToSheets}
							className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
						>
							Export to sheets
						</button>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table className="min-w-full divide-y divide-gray-300">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
											>
												Name
											</th>
											<th
												scope="col"
												className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
											>
												Email Address
											</th>
											<th
												scope="col"
												className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
											>
												Phone Number
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
										{submits && submits.length > 0
											? submits.map((item) => (
													<tr key={item?._id}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
															{item?.fullname}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{item?.email}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															{item?.phone}
														</td>
													</tr>
											  ))
											: null}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnalysisTab
