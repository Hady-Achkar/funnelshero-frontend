import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

const deletePage = (
	funnelId: string,
	pageId: string
): Promise<AxiosResponse<any>> => {
	return ManagerAxios({
		method: 'DELETE',
		url: ApiConstants.MANAGER.DELETE_PAGE,
		data: {
			funnelId,
			pageId,
		},
	})
}

export default deletePage
