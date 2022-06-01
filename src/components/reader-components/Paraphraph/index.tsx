import React, {useEffect, useState} from 'react'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {ComponentLayout} from '../..'

const Paragraph = (props) => {
	return (
		<ComponentLayout>
			<div dangerouslySetInnerHTML={{__html: props.html}} />
		</ComponentLayout>
	)
}

export default Paragraph
