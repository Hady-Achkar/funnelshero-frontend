import {ApiConstants} from '../constants'
import {BundlesAxios} from '../lib'

export const subscribe = async (priceId: string, paymentMethodId: string) => {
	return BundlesAxios({
		method: 'POST',
		url: ApiConstants.BUNDLES.SUBSCRIBE,
		data: {
			priceId: priceId,
			paymentMethodId: paymentMethodId,
		},
	})
}
