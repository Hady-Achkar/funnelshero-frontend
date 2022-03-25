import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'
import {IFunnel} from '../types'

export interface RootDeleteObject {
	status: 'Success' | 'Failure'
	message: string
	funnel: IFunnel
}

const deleteMenu = (
	funnelId: string,
	menuId: string,
): Promise<AxiosResponse<RootDeleteObject>> => {
	return ManagerAxios({
		method: 'DELETE',
		url: `${ApiConstants.MANAGER.DELETE_MENU}?funnelId=${funnelId}&menuId=${menuId}`,
	})
}
export default deleteMenu
