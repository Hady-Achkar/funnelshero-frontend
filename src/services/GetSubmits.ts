import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {IconAxios, ManagerAxios} from '../lib'

export interface ISubmit {
	_id: string
	email: string
	fullname: string
	phone: string
	funnel: string
	createdAt: Date
	updatedAt: Date
	__v: number
}

interface RootObject {
	status: string
	submits: ISubmit[]
	message: string
}

const getOptSubmits = (
	funnelId: string
): Promise<AxiosResponse<RootObject>> => {
	return ManagerAxios({
		method: 'GET',
		url: ApiConstants.MANAGER.GET_SUBMITS,
		data: {
			funnelId: funnelId,
		},
	})
}

export default getOptSubmits
