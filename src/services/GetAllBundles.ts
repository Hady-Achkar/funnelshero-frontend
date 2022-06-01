import {BundlesAxios} from '../lib'
import {ApiConstants} from '../constants'
import {AxiosResponse} from 'axios'
import {IBundle} from '../types'

export const getAllBundles = (): Promise<AxiosResponse<GetAllBundles.RootObject>> => {
	return BundlesAxios({
		method: 'GET',
		url: ApiConstants.BUNDLES.GET_ALL_BUNDLES,
	})
}
export declare namespace GetAllBundles {
	export interface RootObject {
		status: 'Success' | 'Failure';
		message: string;
		prices: IBundle[];
		requestTime: Date;
	}

}

