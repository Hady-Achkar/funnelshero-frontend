import React, {SetStateAction, useCallback, useEffect, useState} from 'react'
import {IFunnel} from '../../../types'
import {useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {AppState} from '../../../reducers'
import {AccordionComponent} from '../..'
import {PlusSmIcon} from '@heroicons/react/solid'
import AddMenuModal from './AddMenuModal'

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

	const [modalOpen, setModalOpen] = useState<boolean>(false)
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


	return (
		<div style={{minHeight: '70vh'}}>
			{funnelState?.menus.map((item, index) => {
				return (
					<AccordionComponent
						key={index}
						title={item?.title}
						body={item?.links.map((link, i) => {
							return (
								<React.Fragment key={i}>
									<div className='flex justify-between py-4 px-2 border-b border-gray-200'>
										<div className='text-sm text-gray-500'>{link?.title}</div>
										<div
											className='inline-flex items-center shadow-sm px-4 py-1.5 border bg-gray-100 text-sm leading-5 font-medium rounded text-gray-500  '>
											<span>{link?.href}</span>
										</div>
									</div>
								</React.Fragment>
							)
						})}
					/>
				)
			})}
			<div className='relative max-w-md mx-auto'>
				<div className='absolute inset-0 flex items-center' aria-hidden='true'>
					<div className='w-full border-t border-gray-300' />
				</div>
				<div className='relative flex justify-center'>
					<button
						onClick={() => setModalOpen(true)}
						type='button'
						className='inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 my-2'
					>
						<PlusSmIcon
							className='-ml-1.5 mr-1 h-5 w-5 text-gray-400'
							aria-hidden='true'
						/>
						<span>Create Menu</span>
					</button>
				</div>
			</div>
			<AddMenuModal open={modalOpen} setOpen={setModalOpen} />
		</div>
	)
}

export default MenusTab
