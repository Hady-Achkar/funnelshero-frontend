import React, {useEffect, useState} from 'react'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Paragraph = (props) => {
	return (
		<div>
			<div dangerouslySetInnerHTML={{__html: props.html}} />
		</div>
	)
}

export default Paragraph
