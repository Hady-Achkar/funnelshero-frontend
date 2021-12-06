import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {IconAxios} from '../lib'

export declare module SearchIcons {
	export interface Image {
		id: string
		url: string
		description: string
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		images: Image[]
		requestTime: Date
	}
}

const searchImages = (
	searchKey: string
): Promise<AxiosResponse<SearchIcons.RootObject>> => {
	return IconAxios({
		method: 'GET',
		url: `${ApiConstants.ICONS.SEARCH}?q=${searchKey}`,
	})
}
export default searchImages
