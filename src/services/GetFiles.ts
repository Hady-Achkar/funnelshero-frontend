import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {FileAxios} from '../lib'

export interface File {
	Key: string
	LastModified: Date
	Size: number
}

interface RootObject {
	status: 'Success' | 'Failure'
	message: string
	files: File[]
	totalSize: number
	requestTime: Date
}

const getMyFiles = (): Promise<AxiosResponse<RootObject>> => {
	return FileAxios({
		method: 'GET',
		url: ApiConstants.FILES.GET_FILES,
	})
}

export default getMyFiles
