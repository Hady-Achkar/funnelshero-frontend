import React, {useState} from 'react'
import {ApiConstants} from '../constants'
import {FileAxios} from '../lib'

const useUpload = () => {
	const [uploadProgress, setUploadProgress] = useState<string>('0')
	const [isUploaded, setIsUploaded] = useState<boolean>(true)
	const [error, setError] = useState<string>()
	const handleUpload = (event) => {
		setUploadProgress('0')
		setIsUploaded(false)
		const formData = new FormData()
		formData.append('file', event.target.files[0])
		return FileAxios.post(
			`${ApiConstants.FILES.UPLOAD_FILE}?type=thumbnail`,
			formData,
			{
				onUploadProgress: (progress) =>
					setUploadProgress(
						((progress.loaded * 100) / progress.total).toFixed(1)
					),
			}
		)
			.then(({data}) => {
				setIsUploaded(true)
				setUploadProgress('0')
				console.log(data)

				return data.file
			})
			.catch((err) => {
				if (err?.response) {
					console.log(err?.response?.data)
					setError(err?.response?.data?.message)
				} else {
					setError(err)
					console.log(err)
				}
			})
	}
	return {
		uploadProgress,
		isUploaded,
		handleUpload,
		error,
	}
}
export default useUpload
