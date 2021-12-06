import axios from 'axios'
import {ApiConstants} from '../../constants'

const FilesAxios = axios.create({
	baseURL: ApiConstants.FILES.BASE_URL,
})

export default FilesAxios
