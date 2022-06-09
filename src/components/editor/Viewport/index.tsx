import React, {useEffect, useRef} from 'react'
import {useEditor} from '@craftjs/core'
import cx from 'classnames'
import {Header} from './Header'
import {Sidebar} from './Sidebar'
import {Toolbox} from './Toolbox'
import {GetSingleFunnel} from '../../../services'
import {IFunnel, IPage} from '../../../types'

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
				<div className="page-container flex flex-1 h-full flex-col">
					<Header
						data={data}
						handleChangePage={handleChangePage}
						mainPage={mainPage}
					/>
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
				<Sidebar
					data={data}
					handleChangePage={handleChangePage}
					mainPage={mainPage}
				/>
			</div>
		</div>
	)
}
export default Viewport
