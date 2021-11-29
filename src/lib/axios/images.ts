import axios from 'axios'
import {ApiConstants} from '../../constants'

const ImagesAxios = axios.create({
	baseURL: ApiConstants.IMAGES.BASE_URL,
})

export default ImagesAxios
