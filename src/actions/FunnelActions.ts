import {Dispatch} from 'redux'
import {AppActions} from '../models/redux'
import {AppState} from '../reducers'
import {addSinglePage, getMyFunnels, GetMyFunnels} from '../services'
import addNewFunnel from '../services/AddFunnel'
import saveFunnel from '../services/EditPage'
export interface IAddFunnelPayload {
	category: string
	title: string
}
export interface IAddPage {
	title: string
	funnelId: string
}
export interface IEditPage {
	title: string
	data: string
	funnelId: string
	pageId: string
}
export const addNewFunnelAction = (
	payload: GetMyFunnels.Funnel
): AppActions => ({
	type: 'ADD_FUNNEL',
	payload,
})
export const addNewPageAction = (funnel: GetMyFunnels.Funnel): AppActions => ({
	type: 'ADD_PAGE',
	funnel,
})
export const editPageAction = (funnel: GetMyFunnels.Funnel): AppActions => ({
	type: 'EDIT_PAGE',
	funnel,
})
export const initializeMyFunnels = (
	funnels: GetMyFunnels.Funnel[]
): AppActions => ({
	type: 'INITIALIZE_MY_FUNNELS',
	funnels,
})
export const loadState = (): AppActions => ({
	type: 'LOAD',
})

export const startAddFunnel = (payload: IAddFunnelPayload) => {
	const {category, title} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		addNewFunnel(category, title)
			.then((res) => {
				const {funnel} = res?.data
				dispatch(addNewFunnelAction(funnel))
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}
}
export const startAddPage = (payload: IAddPage) => {
	const {title, funnelId} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		addSinglePage(title, funnelId)
			.then((res) => {
				const {funnel} = res?.data
				dispatch(addNewPageAction(funnel))
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}
}
export const startSavePageData = (payload: IEditPage) => {
	const {data, funnelId, pageId, title} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		saveFunnel(title, data, funnelId, pageId)
			.then((res) => {
				const {funnel} = res?.data
				dispatch(editPageAction(funnel))
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}
}
export const startInitializeMyFunnels = () => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		getMyFunnels()
			.then((res) => {
				const {funnels} = res?.data
				dispatch(initializeMyFunnels(funnels))
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}
}
