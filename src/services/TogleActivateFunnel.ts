import {AxiosResponse} from 'axios'
import {ManagerAxios} from '../lib'
import {ApiConstants} from '../constants'
import {IFunnel} from '../types'

export const ToggleActivateFunnel = (funnelId: string): Promise<AxiosResponse<IToggleActivateFunnel.RootObject>> => {
	return ManagerAxios({
		method: 'PUT',
		url: ApiConstants.MANAGER.TOGGLE_ACTIVATE_FUNNEL,
		data: {
			funnelId,
		},
	})
}

export declare namespace IToggleActivateFunnel {

	export interface RootObject {
		status: string;
		message: string;
		funnel: IFunnel;
		requestTime: Date;
	}

}

