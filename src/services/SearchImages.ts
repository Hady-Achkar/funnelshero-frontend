import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ImagesAxios} from '../lib'

export declare module SearchImages {
	export interface Urls {
		regular: string
		small: string
		thumb: string
	}

	export interface Image {
		id: string
		createdAt: Date
		updatedAt: Date
		alt: string
		urls: Urls
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
): Promise<AxiosResponse<SearchImages.RootObject>> => {
	return ImagesAxios({
		method: 'GET',
		url: `${ApiConstants.IMAGES.SEARCH}?q=${searchKey}`,
	})
}
export default searchImages
