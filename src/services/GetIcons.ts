import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {IconAxios} from '../lib'

export interface Image {
	id: string
	url: string
	description: string
}

interface RootObject {
	status: 'Success' | 'Failure'
	message: string
	images: Image[]
	requestTime: Date
}

const getRandomIcons = (): Promise<AxiosResponse<RootObject>> => {
	return IconAxios({
		method: 'GET',
		url: `${ApiConstants.ICONS.GET_RANDOM}?limit=52`,
	})
}

export default getRandomIcons
