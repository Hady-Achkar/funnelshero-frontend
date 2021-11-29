import {Dispatch} from 'redux'
import {AppActions} from '../models/redux'
import {AppState} from '../reducers'
import {GetMyFunnels} from '../services'
import addNewFunnel from '../services/AddFunnel'
interface IAddFunnelPayload {
	category: string
	title: string
}
export const addNewFunnelAction = (
	payload: GetMyFunnels.Funnel
): AppActions => ({
	type: 'ADD_FUNNEL',
	payload,
})
export const loadState = (): AppActions => ({
	type: 'LOAD',
})

export const startAddFunnel = (payload: IAddFunnelPayload) => {
	const {category, title} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState)
		addNewFunnel('marad', 'Covax')
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
