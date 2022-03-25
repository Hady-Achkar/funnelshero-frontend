import {Button} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import React, {useCallback, useRef} from 'react'

type FileTypes =
	| 'document'
	| 'image'
	| 'presentation'
	| 'source'
	| 'video'
	| 'all'
interface IProps {
	text?: string
	disabled?: boolean
	id: string
	onChange: (event) => void
	classNames?: string
	accept: FileTypes
}

const UploadButtons: React.FC<IProps> = ({
	onChange,
	text,
	disabled,
	id,
	classNames,
	accept,
}) => {
	const returnAcceptType = useCallback(() => {
		switch (accept) {
			case 'document':
				return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/pdf'
			case 'image':
				return 'image/png,image/jpeg,image/webp'
			case 'presentation':
				return 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf'
			case 'source':
				return 'application/json,text/javascript,text/html,text/css'
			case 'video':
				return 'video/mp4'
			default:
				return '.zip,.rar,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/pdf,image/png,image/jpeg,image/webp,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/json,text/javascript,text/html,text/css,video/mp4'
		}
	}, [accept])
	const uploadRef = useRef()
	const isPrimary = classNames ? '' : 'primary'
	return (
		<div>
			<input
				hidden
				id={id}
				type="file"
				onChange={(e) => onChange(e)}
				ref={uploadRef}
				accept={returnAcceptType()}
			/>
			<Button
				color="primary"
				disabled={disabled}
				className={classNames}
				//@ts-ignore
				onClick={() => uploadRef.current.click()}
			>
				{text} <PhotoCamera />
			</Button>
		</div>
	)
}

export default UploadButtons
