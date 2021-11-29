import {GetMyFunnels} from '../../services/GetMyFunnels'

export const ADD_FUNNEL = 'ADD_FUNNEL'
export const LOAD = 'LOAD'
export const UNLOAD = 'UNLOAD'
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
export type FunnelActions = AddFunnelAction | LoadAction | UnloadAction
