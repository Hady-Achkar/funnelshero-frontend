import {IFunnel} from '../../types'

export const ADD_FUNNEL = 'ADD_FUNNEL'
export const LOAD = 'LOAD'
export const UNLOAD = 'UNLOAD'
export const INITIALIZE_MY_FUNNELS = 'INITIALIZE_MY_FUNNELS'
export const ADD_PAGE = 'ADD_PAGE'
export const EDIT_PAGE = 'EDIT_PAGE'
export const PUBLISH_PAGE = 'PUBLISH_PAGE'
export const TOGGLE_ACTIVE_FUNNEL = 'TOGGLE_ACTIVE_FUNNEL'
export const DELETE_FUNNEL = 'DELETE_FUNNEL'
export const ADD_MENU = 'ADD_MENU'
export const DELETE_MENU = 'DELETE_MENU'

export interface initializeMyFunnels {
	type: typeof INITIALIZE_MY_FUNNELS
	funnels: IFunnel[]
}


export interface addNewMenu {
	type: typeof ADD_MENU
	funnel: IFunnel
}

export interface deleteMenu {
	type: typeof DELETE_MENU
	funnel: IFunnel
}


export interface deleteFunnel {
	type: typeof DELETE_FUNNEL
	funnelId: string
}

export interface publishPage {
	type: typeof PUBLISH_PAGE
	funnel: IFunnel
}

export interface toggleActiveFunnel {
	type: typeof TOGGLE_ACTIVE_FUNNEL
	funnel: IFunnel
}

export interface editPageAction {
	type: typeof EDIT_PAGE
	funnel: IFunnel
}

export interface addNewPage {
	type: typeof ADD_PAGE
	funnel: IFunnel
}

export default interface AddFunnelAction {
	type: typeof ADD_FUNNEL
	payload: IFunnel
}

export interface LoadAction {
	type: typeof LOAD
}

export interface UnloadAction {
	type: typeof UNLOAD
}

export type FunnelActions =
	| AddFunnelAction
	| LoadAction
	| UnloadAction
	| initializeMyFunnels
	| addNewPage
	| editPageAction
	| publishPage
	| toggleActiveFunnel
	| deleteFunnel
	| addNewMenu
	| deleteMenu
