import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

interface RootObject {
	status: 'Success' | 'Failure'
	message: string
	requestTime: Date
}

const deleteFunnel = (funnelId: string): Promise<AxiosResponse<RootObject>> => {
	return ManagerAxios({
		method: 'DELETE',
		url: ApiConstants.MANAGER.DELETE_FUNNEL,
		data: {
			funnelId,
		},
	})
}

export default deleteFunnel
