import {Dispatch} from 'redux'
import {AppActions} from '../models'
import {AppState} from '../reducers'
import {
	addSinglePage,
	getMyFunnels,
	publishPage,
	ToggleActivateFunnel,
	deleteFunnel,
	deletePage,
} from '../services'
import addNewFunnel from '../services/AddFunnel'
import saveFunnel from '../services/EditPage'
import {IFunnel, ILink} from '../types'
import addNewMenu from '../services/AddMenu'
import deleteMenu from '../services/deleteMenu'

export interface IAddFunnelPayload {
	category: string
	title: string
	image: any
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

export interface IAddMenu {
	title: string
	links: ILink[]
}

export const addNewFunnelAction = (payload: IFunnel): AppActions => ({
	type: 'ADD_FUNNEL',
	payload,
})
export const addNewMenuAction = (funnel: IFunnel): AppActions => ({
	type: 'ADD_MENU',
	funnel,
})
export const toggleActiveFunnelAction = (funnel: IFunnel): AppActions => ({
	type: 'TOGGLE_ACTIVE_FUNNEL',
	funnel,
})
export const addNewPageAction = (funnel: IFunnel): AppActions => ({
	type: 'ADD_PAGE',
	funnel,
})
export const editPageAction = (funnel: IFunnel): AppActions => ({
	type: 'EDIT_PAGE',
	funnel,
})
export const initializeMyFunnels = (funnels: IFunnel[]): AppActions => ({
	type: 'INITIALIZE_MY_FUNNELS',
	funnels,
})
export const loadState = (): AppActions => ({
	type: 'LOAD',
})
export const publishPageAction = (funnel: IFunnel): AppActions => ({
	type: 'PUBLISH_PAGE',
	funnel,
})
export const deleteFunnelAction = (funnelId: string): AppActions => ({
	type: 'DELETE_FUNNEL',
	funnelId,
})
export const deletePageAction = (funnelId: string, pageId): AppActions => ({
	type: 'DELETE_PAGE',
	funnelId,
	pageId,
})
export const deleteMenuAction = (funnel: IFunnel): AppActions => ({
	type: 'DELETE_MENU',
	funnel,
})
export const startAddFunnel = (payload: IAddFunnelPayload) => {
	const {category, title, image} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		addNewFunnel(category, title, image)
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
export const startToggleActiveFunnel = (funnelId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		ToggleActivateFunnel(funnelId)
			.then((res) => {
				const {funnel} = res?.data
				dispatch(toggleActiveFunnelAction(funnel))
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
export const startDeleteFunnel = (funnelId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		deleteFunnel(funnelId)
			.then((res) => {
				dispatch(deleteFunnelAction(funnelId))
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
export const startAddMenu = (menuData: IAddMenu, funnelId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		addNewMenu(menuData.title, menuData?.links, funnelId)
			.then((res) => {
				dispatch(addNewMenuAction(res?.data?.funnel))
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
export const startDeleteMenu = (funnelId: string, menuId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		deleteMenu(funnelId, menuId)
			.then((res) => {
				dispatch(deleteMenuAction(res?.data?.funnel))
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
export const startPublishPage = (funnelId: string, pageId, html) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		publishPage(funnelId, pageId, html)
			.then((res) => {
				const {funnel} = res?.data
				dispatch(publishPageAction(funnel))
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

export const startDeletePage = (funnelId: string, pageId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		deletePage(funnelId, pageId)
			.then((res) => {
				dispatch(deletePageAction(funnelId, pageId))
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
