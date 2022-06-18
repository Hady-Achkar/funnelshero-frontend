import React, {useEffect, useState} from 'react'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {ComponentLayout} from '../..'

const Paragraph = (props) => {
	const {language} = props

	return (
		<ComponentLayout>
			<div
				dir={props.language === 'arabic' ? 'rtl' : 'ltr'}
				className={props.language === 'arabic' ? 'text-right' : 'text-left'}
				dangerouslySetInnerHTML={{__html: props.html}}
			/>
		</ComponentLayout>
	)
}

export default Paragraph
