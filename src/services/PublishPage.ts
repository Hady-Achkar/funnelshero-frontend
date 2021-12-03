import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

export const publishPage = async (
	funnelId: string,
	pageId: string
): Promise<AxiosResponse<PublishPage.RootObject>> => {
	return await ManagerAxios({
		method: 'PUT',
		url: ApiConstants.MANAGER.PUBLISH_PAGE,
		data: {
			pageId,
			funnelId,
		},
	})
}

export declare namespace PublishPage {
	export interface Page {
		isPublished: boolean
		_id: string
		title: string
		data: string
		createdAt: Date
		updatedAt: Date
		link: string
		publishedAt: Date
	}

	export interface Publish {
		pages: Page[]
	}

	export interface Funnel {
		publish: Publish
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
		status: 'Sucess' | 'Failure'
		message: string
		funnel: Funnel
		requestTime: Date
	}
}
