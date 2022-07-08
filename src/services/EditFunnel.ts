import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

type Payload = {
	funnelId: string
	proDomain?: string
	category?: string
	image?: string
}
const editFunnel = (payload: Payload): Promise<AxiosResponse<any>> => {
	return ManagerAxios({
		method: 'PUT',
		url: ApiConstants.MANAGER.EDIT_FUNNEL,
		data: payload,
	})
}

export default editFunnel
