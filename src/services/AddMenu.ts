import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'
import {IFunnel, ILink} from '../types'

export interface RootObject {
	status: 'Success' | 'Failure'
	message: string
	funnel: IFunnel
}

const addNewMenu = (
	title: string,
	links: ILink[],
	funnelId: string,
): Promise<AxiosResponse<RootObject>> => {
	return ManagerAxios({
		method: 'POST',
		url: `${ApiConstants.MANAGER.ADD_MENU}?funnelId=${funnelId}`,
		data: {
			title,
			links,
		},
	})
}
export default addNewMenu
