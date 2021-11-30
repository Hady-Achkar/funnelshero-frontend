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
					<div className="">
						<div className="py-1 h-full bg-white">
							{data?.pages.map((page) => {
								return (
									<React.Fragment key={page._id}>
										<div onClick={() => handleChangePage(page)}>
											{page.title}
										</div>
									</React.Fragment>
								)
							})}
							<div
								className="px-5 py-2 flex flex-col items-center h-full justify-center text-center"
								style={{
									color: 'rgba(0, 0, 0, 0.5607843137254902)',
									fontSize: '11px',
								}}
							>
								<h2 className="pb-1">Click on a component to start editing.</h2>
								<h2>
									You could also double click on the layers below to edit their
									names, like in Photoshop
								</h2>
							</div>
						</div>
					</div>
				</SidebarItem>
			</div>
		</SidebarDiv>
	)
}
