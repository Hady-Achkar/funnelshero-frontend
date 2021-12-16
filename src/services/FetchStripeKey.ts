import {BundlesAxios} from '../lib'
import {ApiConstants} from '../constants'
import {AxiosResponse} from 'axios'

export const FetchStripeKey = (): Promise<AxiosResponse<StripeConfig.RootObject>> => {
	return BundlesAxios({
		method: 'GET',
		url: ApiConstants.BUNDLES.CONFIG_STRIPE,
	})
}
export declare namespace StripeConfig {
	export interface RootObject {
		status: 'Success' | 'Failure';
		message: string;
		publicKey: string;
		requestTime: Date;
	}
}

