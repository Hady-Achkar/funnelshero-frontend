import React from 'react'
import {Disclosure} from '@headlessui/react'
import {ChevronUpIcon} from '@heroicons/react/solid'

interface IProps {
	title: string
	body: any
}

const Accordion: React.FC<IProps> = ({title, body}) => {
	return (
		<div className="w-full">
			<div className="w-full p-2 mx-auto bg-white rounded-2xl">
				<Disclosure>
					{({open}) => (
						<>
							<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
								<div className="flex justify-between items-center space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-indigo-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
									<div>
										<span>{title}</span>
									</div>
								</div>
								<ChevronUpIcon
									className={`${
										open ? 'transform rotate-180' : ''
									} w-5 h-5 text-indigo-500`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 ">
								{body}
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	)
}
export default Accordion
