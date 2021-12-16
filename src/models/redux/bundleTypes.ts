import {IBundle} from '../../types'

export const INITIALIZE_BUNDLES = 'INITIALIZE_BUNDLES'

export interface initializeBundles {
	type: typeof INITIALIZE_BUNDLES
	bundles: IBundle[]
}


export type BundleActions = initializeBundles
