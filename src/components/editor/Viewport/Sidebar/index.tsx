import {useEditor} from '@craftjs/core'
import {Layers} from '@craftjs/layers'
import React, {useState} from 'react'
import styled from 'styled-components'

import {SidebarItem} from './SidebarItem'

import CustomizeIcon from '../../../../assets/icons/edit-svgrepo-com.svg'
import PagesIcon from '../../../../assets/icons/pages-svgrepo-com.svg'
import LayerIcon from '../../../../assets/icons/layers-svgrepo-com.svg'
import Toolbar from '../../Toolbar'
import {GetMyFunnels, GetSingleFunnel} from '../../../../services'
import classNames from 'classnames'

export const SidebarDiv = styled.div<{enabled: boolean}>`
	width: 280px;
	opacity: ${(props) => (props.enabled ? 1 : 0)};
	background: #fff;
	margin-right: ${(props) => (props.enabled ? 0 : -280)}px;
`
interface IProps {
	data: GetMyFunnels.Funnel
	handleChangePage: (page: GetSingleFunnel.Page) => void
	mainPage: GetSingleFunnel.Page
}

export const Sidebar: React.FC<IProps> = (props) => {
	const {data, mainPage, handleChangePage} = props
	const [layersVisible, setLayerVisible] = useState(true)
	const [toolbarVisible, setToolbarVisible] = useState(true)
	const [pagesVisible, setPagesVisible] = useState(true)

	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}))

	return (
		<SidebarDiv enabled={enabled} className="sidebar transition bg-white w-2">
			<div className="flex flex-col h-full">
				<SidebarItem
					icon={CustomizeIcon}
					title="Design"
					height={!layersVisible ? 'full' : '55%'}
					visible={toolbarVisible}
					onChange={(val) => setToolbarVisible(val)}
				>
					<Toolbar />
				</SidebarItem>
				<SidebarItem
					icon={LayerIcon}
					title="Layers"
					height={!toolbarVisible ? 'full' : '45%'}
					visible={layersVisible}
					onChange={(val) => setLayerVisible(val)}
				>
					<div className="">
						<Layers expandRootOnLoad={false} />
					</div>
				</SidebarItem>

				<SidebarItem
					//@ts-ignore
					icon={PagesIcon}
					title="Pages"
					height={!toolbarVisible ? 'full' : '45%'}
					visible={pagesVisible}
					onChange={(val) => setPagesVisible(val)}
				>
					<div className="py-1 h-full bg-white">
						{data?.pages.map((page) => {
							return (
								<div
									key={page._id}
									className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6  overflow-hidden"
								>
									<dt>
										<div
											className="absolute bg-indigo-500 rounded-md p-3 cursor-pointer hover:bg-indigo-300"
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
													d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<p className="ml-16 text-sm font-medium text-gray-900 truncate">
											{page.title}
										</p>
									</dt>
									<dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
										<p className="text-xs font-semibold text-gray-500 cursor-pointer hover:text-indigo-400">
											Rename
										</p>
									</dd>
								</div>
							)
						})}
					</div>
				</SidebarItem>
			</div>
		</SidebarDiv>
	)
}
