import React, {useEffect} from 'react'
import {useEditor} from '@craftjs/core'
import cx from 'classnames'
import {Header} from './Header'
import {Sidebar} from './Sidebar'
import {Toolbox} from './Toolbox'
import {GetMyFunnels, GetSingleFunnel} from '../../../services'

interface IProps {
	children: React.ReactElement
	data: GetMyFunnels.Funnel
	handleChangePage: (page: GetSingleFunnel.Page) => void
	mainPage: GetSingleFunnel.Page
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

	useEffect(() => {
		if (!window) {
			return
		}

		window.requestAnimationFrame(() => {
			// Notify doc site
			window.parent.postMessage(
				{
					LANDING_PAGE_LOADED: true,
				},
				'*'
			)
			// setTimeout(() => {
			// 	setOptions((options) => {
			// 		options.enabled = true
			// 	})
			// }, 200)
		})
	}, [setOptions])
	const {actions, query} = useEditor()
	actions.deserialize(mainPage?.data)

	return (
		<div className="viewport">
			<div
				className={cx(['flex h-full overflow-hidden flex-row w-full fixed'])}
			>
				<Toolbox />
				<div className="page-container flex flex-1 h-full flex-col bg-indigo-50">
					<Header
						data={data}
						handleChangePage={handleChangePage}
						mainPage={mainPage}
					/>
					<div
						className={cx([
							'craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto',
							{
								'bg-renderer-white': enabled,
							},
						])}
						ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
					>
						<div className="relative flex-col flex items-center pt-8">
							{children}
						</div>
						<div
							className={
								'flex items-center justify-center w-full pt-6 text-xs text-light-gray-2'
							}
						>
							<a href="https://www.netlify.com">
								This site is powered by Funnelshero
							</a>
						</div>
					</div>
				</div>
				<Sidebar />
			</div>
		</div>
	)
}
export default Viewport
