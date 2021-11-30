import {GetMyFunnels} from '../../services/GetMyFunnels'

export const ADD_FUNNEL = 'ADD_FUNNEL'
export const LOAD = 'LOAD'
export const UNLOAD = 'UNLOAD'
export const INITIALIZE_MY_FUNNELS = 'INITIALIZE_MY_FUNNELS'
export interface initializeMyFunnels {
	type: typeof INITIALIZE_MY_FUNNELS
	funnels: GetMyFunnels.Funnel[]
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
