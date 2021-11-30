import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

export declare module EditPage {
	export interface Page {
		_id: string
		title: string
		data: string
		createdAt: Date
		updatedAt: Date
		link: string
	}

	export interface Funnel {
		favIcon: string
		pages: Page[]
		_id: string
		category: string
		title: string
		contactEmail: string
		createdAt: Date
		updatedAt: Date
		baseDomain: string
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		funnel: Funnel
		requestTime: Date
	}
}

const savePage = (
	title: string,
	data: string,
	funnelId: string,
	pageId: string
): Promise<AxiosResponse<EditPage.RootObject>> => {
	return ManagerAxios({
		method: 'PUT',
		url: ApiConstants.MANAGER.EDIT_PAGE,
		data: {
			title,
			data,
			funnelId,
			pageId,
		},
	})
}

export default savePage
