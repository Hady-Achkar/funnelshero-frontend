import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'
import {IFunnel} from '../types'

interface RootObject {
	status: 'Success' | 'Failure'
	message: string
	funnel: IFunnel
}

const addNewFunnel = (
	category: string,
	title: string
): Promise<AxiosResponse<RootObject>> => {
	return ManagerAxios({
		method: 'POST',
		url: ApiConstants.MANAGER.NEW_FUNNEL,
		data: {
			category,
			title,
		},
	})
}

export default addNewFunnel
