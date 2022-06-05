import {useEditor} from '@craftjs/core'
import React, {useEffect, useState} from 'react'
import lz from 'lzutf8'
import ReactDOMServer from 'react-dom/server'
import {
	ChevronRightIcon,
	FastForwardIcon,
	HomeIcon,
	RewindIcon,
} from '@heroicons/react/outline'
import {GetSingleFunnel} from '../../../services'
import {useHistory, Prompt} from 'react-router-dom'
import {startSavePageData, startPublishPage} from '../../../actions'
import {useDispatch} from 'react-redux'
import {IFunnel, IPage} from '../../../types'
import ConfirmationModal from '../../common/ConfirmationModal'
import FunnelsSettings from '../../common/FunnelSettings'
import {Reader} from '../..'
import {Tooltip} from '@material-ui/core'
import {FirstPage, LastPage} from '@mui/icons-material'
interface IProps {
	data: IFunnel
	handleChangePage: (page: IPage) => void
	mainPage: IPage
}
export const Header: React.FC<IProps> = (props) => {
	const {data, mainPage} = props

	const {enabled, canUndo, canRedo, actions} = useEditor((state, query) => ({
		enabled: state.options.enabled,
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
	}))
	const [json, setJson] = useState<any>('')
	const {query} = useEditor()

	const history = useHistory()
	const handleEncode = () => {
		const serialized = query.serialize()
		const compressed = lz.encodeBase64(lz.compress(serialized))
		setJson(compressed)
	}
	// title: string
	// data: string
	// funnelId: string
	// pageId: string
	const dispatch = useDispatch()
	const handleDecode = () => {
		const serialized = query.serialize()
		const compressed = lz.encodeBase64(lz.compress(serialized))
		const deCompressed = lz.decompress(lz.decodeBase64(compressed))
		// const deSerialized = actions.deserialize(deCompressed);
		dispatch(
			startSavePageData({
				title: mainPage?.title,
				data: deCompressed,
				funnelId: data?._id,
				pageId: mainPage?._id,
			})
		)
	}

	const isDisabled = Boolean(json === '')

	const handleDelete = () => {
		console.log('im deleted, lol')
	}
	const [openConfirmPublish, setOpenConfirmPublish] = useState<boolean>(false)

	const htmlData = ReactDOMServer.renderToStaticMarkup(
		<Reader json={mainPage?.data} />
	)

	const [blocking, setBlocking] = useState(false)

	const handlePublishPage = () => {
		dispatch(startPublishPage(data?._id, mainPage?._id, htmlData))
		setOpenConfirmPublish(false)
	}
	const isPublished = Boolean(mainPage?.isPublished)

	const [settingsModal, setSettingsModal] = useState(false)

	return (
		<div className="bg-white p-3 shadow-sm">
			<div className="sm:flex sm:items-center sm:justify-between">
				<nav className="flex" aria-label="Breadcrumb">
					<ol role="list" className="flex items-center space-x-4">
						<li>
							<div>
								<p
									onClick={() => history.push('/')}
									className="text-gray-400 hover:text-gray-500 cursor-pointer"
								>
									<HomeIcon
										className="flex-shrink-0 h-5 w-5"
										aria-hidden="true"
									/>
									<span className="sr-only">Home</span>
								</p>
							</div>
						</li>
						<li>
							<div className="flex items-center">
								<ChevronRightIcon
									className="flex-shrink-0 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<p
									onClick={() => history.push('/dashboard')}
									className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
								>
									My funnels
								</p>
							</div>
						</li>
						<li>
							<div className="flex items-center">
								<ChevronRightIcon
									className="flex-shrink-0 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
									{data.title}
								</p>
							</div>
						</li>
					</ol>
				</nav>
				<div>
					<div className="flex space-x-4">
						<div>
							<Tooltip title="Undo" placement="bottom">
								<button
									disabled={!canUndo}
									onClick={() => actions.history.undo()}
								>
									<FirstPage
										className={
											!canUndo
												? 'text-gray-400 w-6 h-6'
												: 'text-indigo-800 w-6 h-6'
										}
									/>
								</button>
							</Tooltip>
						</div>

						<div>
							<Tooltip title="Redo" placement="bottom">
								<button
									disabled={!canRedo}
									onClick={() => actions.history.redo()}
								>
									<LastPage
										className={
											!canRedo
												? 'text-gray-400 w-6 h-6'
												: 'text-indigo-800 w-6 h-6'
										}
									/>
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
				<div className="mt-3 flex sm:mt-0 sm:ml-4">
					{enabled ? (
						<React.Fragment>
							<div className="inline-flex items-center cursor-pointer hover:opacity-80">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									onClick={() => setSettingsModal(true)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							{/* <button
								type="button"
								className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
								onClick={() => {
									actions.setOptions((options) => (options.enabled = !enabled))
									// handleDecode()
								}}
							>
								Preview
							</button> */}
							<button
								type="button"
								className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
								onClick={() => setOpenConfirmPublish(true)}
								disabled={isPublished}
							>
								Publish
							</button>
							<button
								type="button"
								className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
								onClick={handleDecode}
							>
								Save
							</button>
						</React.Fragment>
					) : (
						<div>
							<button
								type="button"
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
								onClick={() => {
									actions.setOptions((options) => (options.enabled = !enabled))
								}}
							>
								Edit
							</button>
							<button
								type="button"
								className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
							>
								Publish
							</button>
						</div>
					)}
				</div>
			</div>
			<ConfirmationModal
				open={openConfirmPublish}
				variant="Info"
				title="Publish Page"
				text="Are you sure you want to publish this page?"
				buttonText="Yes, sure"
				setOpen={() => setOpenConfirmPublish(false)}
				action={handlePublishPage}
			/>
			<FunnelsSettings open={settingsModal} setOpen={setSettingsModal} />
			<div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
		</div>
	)
}
