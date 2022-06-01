import {useEditor} from '@craftjs/core'
import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import {SidebarItem} from './SidebarItem'
import CustomizeIcon from '../../../../assets/icons/edit-svgrepo-com.svg'
import PagesIcon from '../../../../assets/icons/pages-svgrepo-com.svg'
import Toolbar from '../../Toolbar'
import {
	deletePage,
	getSingleFunnel,
	GetSingleFunnel,
} from '../../../../services'
import {NewPageModal} from '../../..'
import {IFunnel} from '../../../../types'
import moment from 'moment'
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {startInitializeMyFunnels} from '../../../../actions'

export const SidebarDiv = styled.div<{enabled: boolean}>`
	width: 400px;
	opacity: ${(props) => (props.enabled ? 1 : 0)};
	background: #fff;
	margin-right: ${(props) => (props.enabled ? 0 : -400)}px;
	overflow-y: scroll;
`
interface IProps {
	data: IFunnel
	handleChangePage: (page: GetSingleFunnel.Page) => void
	mainPage: GetSingleFunnel.Page
}

export const Sidebar: React.FC<IProps> = (props) => {
	const {data, mainPage, handleChangePage} = props
	const [layersVisible, setLayerVisible] = useState(true)
	const [toolbarVisible, setToolbarVisible] = useState(true)
	const [pagesVisible, setPagesVisible] = useState(true)

	const [funnel, setFunnel] = useState<any>()
	const {funnelTitle} = useParams()

	const dispatch = useDispatch()

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	const [newPageModalOpen, setNewPageModalOpen] = useState<boolean>(false)

	const handleDeletePage = useCallback((funnelId, pageId) => {
		deletePage(funnelId, pageId)
			.then((res) => dispatch(startInitializeMyFunnels()))
			.catch((err) => console.log(err))
	}, [])

	return (
		<SidebarDiv enabled={enabled} className="sidebar transition bg-white w-2">
			<div className="flex flex-col h-full">
				<SidebarItem
					icon={CustomizeIcon}
					title="Design"
					height={!pagesVisible ? 'full' : '40%'}
					visible={toolbarVisible}
					onChange={(val) => setToolbarVisible(val)}
				>
					<Toolbar />
				</SidebarItem>
				{/* <SidebarItem
					icon={LayerIcon}
					title="Layers"
					height={!toolbarVisible ? 'full' : '45%'}
					visible={layersVisible}
					onChange={(val) => setLayerVisible(val)}
				>
					<div className="">
						<Layers expandRootOnLoad={false} />
					</div>
				</SidebarItem> */}

				<SidebarItem
					//@ts-ignore
					icon={PagesIcon}
					title="Pages"
					height={!toolbarVisible ? 'full' : '60%'}
					visible={pagesVisible}
					onChange={(val) => setPagesVisible(val)}
				>
					<div className="p-3 py-5 border-b divide-gray-200">
						<div className="flex items-center space-x-3">
							<div
								className="bg-indigo-50 inline-block rounded-md p-3 cursor-pointer hover:bg-indigo-100"
								onClick={() => setNewPageModalOpen(true)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4v16m8-8H4"
									/>
								</svg>
							</div>

							<p className="w-full text-sm font-medium flex items-center text-gray-700 truncate">
								Create a new page
							</p>
						</div>
					</div>

					{data?.pages.map((page) => {
						return (
							<div className="p-3 py-5 border-b divide-gray-200" key={page._id}>
								<div className="flex items-center space-x-3 w-full">
									<div
										className="bg-indigo-500 inline-block rounded-md p-3 cursor-pointer hover:bg-indigo-600"
										onClick={() => handleChangePage(page)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									</div>
									<div className="w-full">
										<p className="text-sm font-medium flex items-center text-gray-900 truncate">
											{page.title} Page
										</p>
										<div>
											<p
												style={{
													fontSize: '12px',
												}}
											>
												Last publish {moment(page?.publishedAt).format('LLL')}
											</p>
										</div>
									</div>
									<div className="flex items-center justify-end p-3 pb-4 hover:opacity-80 cursor-pointer">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="gray"
											onClick={() => handleDeletePage(data?._id, page?._id)}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</div>
								</div>
							</div>
						)
					})}
				</SidebarItem>
			</div>
			<NewPageModal
				open={newPageModalOpen}
				setOpen={setNewPageModalOpen}
				funnelId={data?._id}
			/>
		</SidebarDiv>
	)
}
