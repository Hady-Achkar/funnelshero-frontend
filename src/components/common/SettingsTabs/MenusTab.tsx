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

interface IProps {
	open: boolean
	setOpen: React.Dispatch<SetStateAction<boolean>>
}

type Params = {
	funnelTitle: string
}
const MenusTab: React.FC<IProps> = () => {
	const {funnelTitle} = useParams<Params>()
	const {funnels} = useSelector((state: AppState) => state.funnels)
	const history = useHistory()
	const [headeMenuOpen, setHeadeMenuOpen] = useState<boolean>(false)
	const [footerMenuOpen, setFooterMenuOpen] = useState<boolean>(false)
	const [funnelState, setFunnelState] = useState<IFunnel>()
	const [activeMenu, setActiveMenu] = useState<string>()
	const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] =
		useState<boolean>(false)
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
	const dispatch = useDispatch()
	const handleDelete = () => {
		dispatch(startDeleteMenu(funnelState?._id, activeMenu))
		setConfirmDeleteModalOpen(false)
	}

	const isHeaderMenuFound = Boolean(
		funnelState?.menus?.find((item) => item.title === 'Header')
	)

	return (
		<div style={{minHeight: '70vh'}}>
			{funnelState?.menus.map((item, index) => {
				return (
					<AccordionComponent
						key={index}
						title={item?.title}
						body={
							<React.Fragment>
								{item?.links.map((link, i) => {
									return (
										<React.Fragment key={i}>
											<div className="flex justify-between py-4 px-2 border-b border-gray-200">
												<div className="text-sm text-gray-500">
													{link?.title}
												</div>
												<div className="inline-flex items-center shadow-sm px-4 py-1.5 border bg-gray-100 text-sm leading-5 font-medium rounded text-gray-500  ">
													<span>{link?.href}</span>
												</div>
											</div>
										</React.Fragment>
									)
								})}
								{item._id && (
									<button
										onClick={() => {
											setActiveMenu(item._id)
											setConfirmDeleteModalOpen(true)
										}}
									>
										Delete
									</button>
								)}
							</React.Fragment>
						}
					/>
				)
			})}
			{!isHeaderMenuFound && (
				<div className="relative max-w-md mx-auto">
					<div
						className="absolute inset-0 flex items-center"
						aria-hidden="true"
					>
						<div className="w-full border-t border-gray-300" />
					</div>
					<div className="relative flex justify-center">
						<button
							onClick={() => setHeadeMenuOpen(true)}
							type="button"
							className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 my-2"
						>
							<PlusSmIcon
								className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
							<span>Create Header Menu</span>
						</button>
					</div>
				</div>
			)}

			<AddHeaderMenuModal open={headeMenuOpen} setOpen={setHeadeMenuOpen} />
			<ConfirmationModal
				open={confirmDeleteModalOpen}
				variant="Warning"
				title="Delete Menu"
				text="Are you sure you want to delete this menu?"
				buttonText="Yes, sure"
				setOpen={() => setConfirmDeleteModalOpen(false)}
				action={handleDelete}
			/>
		</div>
	)
}

export default MenusTab
