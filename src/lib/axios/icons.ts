import axios from 'axios'
import {ApiConstants} from '../../constants'

const IconsAxios = axios.create({
	baseURL: ApiConstants.ICONS.BASE_URL,
})

export default IconsAxios
