import {BundlesAxios} from '../lib'
import {ApiConstants} from '../constants'
import {AxiosResponse} from 'axios'

export const getCheckoutDetails = (priceId: string): Promise<AxiosResponse<GetCheckoutDetails.RootObject>> => {
	return BundlesAxios({
		method: 'GET',
		url: `${ApiConstants.BUNDLES.GET_CHECKOUT_DETAILS}?priceId=${priceId}`,
	})
}

export declare namespace GetCheckoutDetails {

	export interface Metadata {
	}

	export interface Recurring {
		aggregate_usage?: any;
		interval: string;
		interval_count: number;
		trial_period_days: number;
		usage_type: string;
	}

	export interface Price {
		id: string;
		object: string;
		active: boolean;
		billing_scheme: string;
		created: number;
		currency: string;
		livemode: boolean;
		lookup_key?: any;
		metadata: Metadata;
		nickname?: any;
		product: string;
		recurring: Recurring;
		tax_behavior: string;
		tiers_mode?: any;
		transform_quantity?: any;
		type: string;
		unit_amount: number;
		unit_amount_decimal: string;
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string;
		price: Price;
		requestTime: Date;
	}

}

