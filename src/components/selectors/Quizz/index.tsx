import React from 'react'
import {useNode, Element} from '@craftjs/core'
import {Container, Image, Text, Divider} from '../'
import {Container as MaterialContainer, Grid} from '@material-ui/core'
const Quizz = () => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<MaterialContainer innerRef={connect}>
			<Container>
				<MaterialContainer className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Element
						is={Text}
						id="text-1"
						text="What is your favorite season?"
						fontWeight="500"
						fontSize="18px"
					/>
					<div className="w-full border-t border-gray-300 my-4" />
					<ul
						role="list"
						className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8"
					>
						<Element is={Container} id="c-5">
							<div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
								<Element
									is={Image}
									src="https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
									id="1"
								/>
							</div>
							<Element is={Text} id="text-2" text="Summer" />
						</Element>

						<Element is={Container} id="c-3">
							<div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
								<Element
									is={Image}
									id="3"
									src="https://images.unsplash.com/photo-1574376407492-c3cf78231def?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZhbGx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
								/>
							</div>
							<Element is={Text} id="text-2" text="Fall" />
						</Element>

						<Element is={Container} id="c-1">
							<div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
								<Element
									is={Image}
									id="2"
									src="https://images.unsplash.com/photo-1489674267075-cee793167910?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
								/>
							</div>
							<Element is={Text} id="text-3" text="Winter" />
						</Element>

						<Element is={Container} id="c-2">
							<div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
								<Element
									is={Image}
									id="4"
									src="https://images.unsplash.com/photo-1541296093088-f079b71d3478?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fG91dGRvb3J8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
								/>
							</div>
							<Element is={Text} id="text-4" text="Spring" />
						</Element>
					</ul>
				</MaterialContainer>
			</Container>
		</MaterialContainer>
	)
}

Quizz.craft = {
	displayName: 'Quizz',
}
export default Quizz
