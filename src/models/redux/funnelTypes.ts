import {GetSinglePage} from '../../services'
import {GetMyFunnels} from '../../services/GetMyFunnels'

export const ADD_FUNNEL = 'ADD_FUNNEL'
export const LOAD = 'LOAD'
export const UNLOAD = 'UNLOAD'
export const INITIALIZE_MY_FUNNELS = 'INITIALIZE_MY_FUNNELS'
export const ADD_PAGE = 'ADD_PAGE'
export const EDIT_PAGE = 'EDIT_PAGE'
export interface initializeMyFunnels {
	type: typeof INITIALIZE_MY_FUNNELS
	funnels: GetMyFunnels.Funnel[]
}
export interface editPageAction {
	type: typeof EDIT_PAGE
	funnel: GetMyFunnels.Funnel
}
export interface addNewPage {
	type: typeof ADD_PAGE
	funnel: GetMyFunnels.Funnel
}
export interface AddFunnelAction {
	type: typeof ADD_FUNNEL
	payload: GetMyFunnels.Funnel
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
