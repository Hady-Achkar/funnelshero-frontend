import {Dispatch} from 'redux'
import {AppActions} from '../models'
import {AppState} from '../reducers'
import {getAllBundles} from '../services'
import {IBundle} from '../types'

export const getAllBundlesAction = (bundles: IBundle[]): AppActions => ({
	type: 'INITIALIZE_BUNDLES',
	bundles,
})
export const startInitializeBundles = () => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		getAllBundles()
			.then((res) => {
				const {prices} = res?.data
				dispatch(
					getAllBundlesAction(prices),
				)
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

