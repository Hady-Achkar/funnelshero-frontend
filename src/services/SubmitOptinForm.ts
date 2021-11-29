import {AxiosResponse} from 'axios'
import {ManagerAxios} from '../lib'
import {ApiConstants} from '../constants'
export interface AddOptSubmits {
	email: string
	fullname: string
	phone: string
	funnelTitle: string
}

const submitOptinForm = async (
	payload: AddOptSubmits
): Promise<AxiosResponse<AddOptSubmits>> => {
	return await ManagerAxios({
		method: 'POST',
		url: ApiConstants.MANAGER.SUBMIT_OPTIN_FORM,
		data: {...payload},
	})
}
export default submitOptinForm
