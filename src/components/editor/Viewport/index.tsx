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
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline'
import React, { Component }  from 'react';
import {IFunnel, IPage} from '../../../types';
import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {Toolbox} from './Toolbox';
import cx from 'classnames'

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
		const {children, data, handleChangePage, mainPage} = props
		const {
			enabled,
			connectors,
			actions: {setOptions},
		} = useEditor((state) => ({
			enabled: state.options.enabled,
		}))
  return (
    <Fragment>
      {/* Background color split screen for large screens */}
      <div className="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
      <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" />
      <div className="relative min-h-screen flex flex-col">
        {/* Navbar */}
		<Header
						data={data}
						handleChangePage={handleChangePage}
						mainPage={mainPage}
					/>
        {/* 3 column wrapper */}
        <div className="flex-grow w-full  mx-auto lg:flex">
          {/* Left sidebar & main wrapper */}
          {/* <div className="flex-1 min-w-0 bg-white xl:flex">

          </div> */}
		  <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-gray-200 bg-white">
              {/* <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0"> */}
              <div className="h-full">

                {/* Start left column area */}
                <div className="h-full relative" style={{ minHeight: '12rem' }}>
					<Toolbox />
                </div>
                {/* End left column area */}
              </div>
            </div>
            <div className="lg:min-w-0 lg:flex-1">
              <div className="h-full">
              {/* <div className="h-full py-6 px-4 sm:px-6 lg:px-8"> */}

                {/* Start main area*/}
                <div className="relative h-full" style={{ minHeight: '36rem' }}>
					<div className="page-container flex flex-1 h-full flex-col">
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
                </div>
                {/* End main area */}
              </div>
            </div>
          <div className="pr-4 lg:flex-shrink-0 lg:border-gray-200 bg-gray-100">
            <div className="h-full  lg:w-80">
              {/* Start right column area */}
              <div className="h-full relative" style={{ minHeight: '16rem' }}>
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