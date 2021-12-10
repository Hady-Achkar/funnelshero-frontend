import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {FileAxios} from '../lib'

interface RootObject {
	status: 'Success' | 'Failure'
	message: string
	requestTime: Date
}

const deleteFunnel = (funnelId: string): Promise<AxiosResponse<RootObject>> => {
	return FileAxios({
		method: 'DELETE',
		url: ApiConstants.MANAGER.DELETE_FUNNEL,
		data: {
			funnelId,
		},
	})
}

export default deleteFunnel
