import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

export const addSinglePage = (title: string, funnelId: string) => {
	return ManagerAxios({
		method: 'POST',
		url: ApiConstants.MANAGER.ADD_PAGE,
		data: {
			title,
			funnelId,
		},
	})
}
export declare module AddSinglePage {
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
		owner: string
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
