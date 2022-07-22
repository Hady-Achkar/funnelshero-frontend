// import React, {useEffect, useRef} from 'react'
// import {useEditor} from '@craftjs/core'
// import cx from 'classnames'
// import {Header} from './Header'
// import {Sidebar} from './Sidebar'
// import {Toolbox} from './Toolbox'
// import {GetSingleFunnel} from '../../../services'
// import {IFunnel, IPage} from '../../../types'

// interface IProps {
// 	children: React.ReactElement
// 	data: IFunnel
// 	handleChangePage: (page: IPage) => void
// 	mainPage: IPage
// }
// const Viewport: React.FC<IProps> = (props) => {
// 	const {children, data, handleChangePage, mainPage} = props
// 	const {
// 		enabled,
// 		connectors,
// 		actions: {setOptions},
// 	} = useEditor((state) => ({
// 		enabled: state.options.enabled,
// 	}))

// 	useEffect(() => {
// 		if (!window) {
// 			return
// 		}

// 		window.requestAnimationFrame(() => {
// 			// Notify doc site
// 			window.parent.postMessage(
// 				{
// 					LANDING_PAGE_LOADED: true,
// 				},
// 				'*'
// 			)
// 			// setTimeout(() => {
// 			// 	setOptions((options) => {
// 			// 		options.enabled = true
// 			// 	})
// 			// }, 200)
// 		})
// 	}, [setOptions])
// 	const {actions, query} = useEditor()
// 	actions.deserialize(mainPage?.data)

// 	return (
// 		<div className="viewport">
// 			<div
// 				className={cx(['flex h-full overflow-hidden flex-row w-full fixed'])}
// 			>
// 				<Toolbox />
// 				<div className="page-container flex flex-1 h-full flex-col">
// 					<Header
// 						data={data}
// 						handleChangePage={handleChangePage}
// 						mainPage={mainPage}
// 					/>
// 					<div
// 						className={cx([
// 							'craftjs-renderer flex-1 h-full transition pb-8 overflow-auto',
// 							{
// 								'bg-gray-50': enabled,
// 							},
// 						])}
// 						ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
// 					>
// 						<div className="relative flex-col flex items-center pt-8">
// 							{children}
// 						</div>
// 					</div>
// 				</div>
// 				<Sidebar
// 					data={data}
// 					handleChangePage={handleChangePage}
// 					mainPage={mainPage}
// 				/>
// 			</div>
// 		</div>
// 	)
// }
// export default Viewport
import {useEditor} from '@craftjs/core'
import { Fragment, useCallback, useState } from 'react'
import React, { Component }  from 'react';
import {IFunnel, IPage} from '../../../types';
import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {Toolbox} from './Toolbox';
import cx from 'classnames'
import { SidebarItem } from './Sidebar/SidebarItem'
import moment from 'moment'
import {startInitializeMyFunnels} from '../../../actions'
import PagesIcon from '../../../assets/icons/pages-svgrepo-com.svg'
import {
	deletePage,
	getSingleFunnel,
	GetSingleFunnel,
} from '../../../services'
import { useDispatch } from 'react-redux'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
interface IProps {
	children: React.ReactElement
	data: IFunnel
	handleChangePage: (page: IPage) => void
	mainPage: IPage
}
const Viewport: React.FC<IProps> = (props) => {
  const [pagesVisible, setPagesVisible] = useState(true)
  const [toolbarVisible, setToolbarVisible] = useState(true)
	const [newPageModalOpen, setNewPageModalOpen] = useState<boolean>(false)
  const [tabs, setTabs] = useState(false)

  const dispatch = useDispatch()
		const {children, data, handleChangePage, mainPage} = props
		const {
			enabled,
			connectors,
			actions: {setOptions},
		} = useEditor((state) => ({
			enabled: state.options.enabled,
		}))
    const handleDeletePage = useCallback((funnelId, pageId) => {
      deletePage(funnelId, pageId)
        .then((res) => dispatch(startInitializeMyFunnels()))
        .catch((err) => console.log(err))
    }, [])
  return (
    <Fragment>
      {/* Background color split screen for large screens */}
      {/* <div className="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
      <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" /> */}
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        {/* Navbar */}
        <Header
          data={data}
          handleChangePage={handleChangePage}
          mainPage={mainPage}
        />
        {/* 3 column wrapper */}
        <div className="flex-grow w-full  mx-auto lg:flex">
		        <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-gray-200 bg-white hc overflow-y-scroll">
              {/* <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0"> */}
              <div className="">
                {/* Start left column area */}
                <div className=" relative" style={{ minHeight: '12rem' }}>
                  <div className="tab_items w-full flex w-full flex-wrap content-center items-center bg-gray-200 justify-center">
                    <p
                      className={`tab_item cursor-pointer  ${tabs ? " active_switch" : ""}`} onClick={()=>{setTabs(!tabs)}} >
                      Pages
                    </p>
                    <p className={`tab_item cursor-pointer ${tabs ? "" : " active_switch"}`} onClick={()=>{setTabs(!tabs)}}>
                      Components
                    </p>
                  </div>
                  {
                    tabs ? (<SidebarItem
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
                              <p className="text-sm capitalize font-medium flex items-center text-gray-900 truncate">
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
                    </SidebarItem>) : (<Toolbox />)
                  }
                  
                  
                </div>
                {/* End left column area */}
              </div>
            </div>
            {/* height: calc(100vh - 66px);
            overflow-y: scroll; */}
            <div className="lg:min-w-0 lg:flex-1 hc overflow-y-scroll">

              {/* <div className="h-full py-6 px-4 sm:px-6 lg:px-8"> */}

                {/* Start main area*/}
                <div className="relative" style={{ minHeight: '36rem' }}>
					<div className="page-container flex flex-1 flex-col">
						<div
							className={cx([
								'craftjs-renderer flex-1 h-full transition pb-8 overflow-auto',
								{
									'bg-gray-50': enabled,
								},
							])}
							ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
						>
							<div className="relative flex-col flex items-center pt-8">
								{children}
							</div>
					</div>
                </div>
                {/* End main area */}
              </div>
            </div>
            <div className="pr-4 lg:flex-shrink-0 border-gray-200 border-l-2 bg-gray-50 hc overflow-y-scroll">
              <div className="lg:w-80">
                {/* Start right column area */}
                <div className="relative" style={{ minHeight: '16rem' }}>
            <Sidebar
              data={data}
              handleChangePage={handleChangePage}
              mainPage={mainPage}
            />
                </div>
                {/* End right column area */}
              </div>
            </div>
        </div>
      </div>
    </Fragment>
  )
}
export default Viewport;