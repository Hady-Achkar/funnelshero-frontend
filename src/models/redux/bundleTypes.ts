import {IBundle} from '../../types'

export const INITIALIZE_BUNDLES = 'INITIALIZE_BUNDLES'
export const ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD'


export interface initializeBundles {
	type: typeof INITIALIZE_BUNDLES
	bundles: IBundle[]
}


export type BundleActions = initializeBundles
