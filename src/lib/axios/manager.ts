import axios from 'axios'
import {ApiConstants} from '../../constants'

const ManagerAxios = axios.create({
	baseURL: ApiConstants.MANAGER.BASE_URL,
})

export default ManagerAxios
