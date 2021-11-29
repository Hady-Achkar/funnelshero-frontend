import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ImagesAxios} from '../lib'

export declare namespace GetRandomImages {
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

const getRandomImages = (): Promise<
	AxiosResponse<GetRandomImages.RootObject>
> => {
	return ImagesAxios({
		method: 'GET',
		url: ApiConstants.IMAGES.GET_RANDOM,
	})
}
export default getRandomImages
