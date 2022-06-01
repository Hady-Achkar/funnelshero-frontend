import axios from 'axios'
import {ApiConstants} from '../../constants'

const ServerAxios = axios.create({
	baseURL: ApiConstants.SERVER.BASE_URL,
})

export default ServerAxios
