import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

export interface Link {
	title: string
	href: string
}

export interface RootObject {
	title: string
	links: Link[]
}

const addNewMenu = (
	category: string,
	title: string
): Promise<AxiosResponse<RootObject>> => {
	return ManagerAxios({
		method: 'POST',
		url: ApiConstants.MANAGER.ADD_MENU,
		data: {
			category,
			title,
		},
	})
}
