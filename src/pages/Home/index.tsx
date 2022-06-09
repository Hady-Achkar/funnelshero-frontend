import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {
	MainFooter,
	MainHeader,
	CEO,
	CTA,
	FAQ,
	Feature,
	Hero,
} from '../../components'
import {UserState} from '../../models/IUser'
import {AppState} from '../../reducers'
import {useHistory} from 'react-router-dom'
import HomeImage from '../../assets/home.png'
import {
	ClipboardCheckIcon,
	DeviceMobileIcon,
	EmojiHappyIcon,
	ExternalLinkIcon,
	LightningBoltIcon,
	PencilAltIcon,
	PhotographIcon,
} from '@heroicons/react/outline'

const Home = () => {
	const {
		isAuthenticated,
		user: {status},
	} = useSelector((state: AppState) => state.auth)

	const history = useHistory()

	useEffect(() => {
		if (isAuthenticated && status !== UserState.SUB_ACTIVE) {
			history.push('/bundles')
		}
	}, [isAuthenticated, status])

	const features = [
		{
			name: 'Blazing Fast',
			description:
				'Design and build multiple pages with blazing fast performance.',
			icon: LightningBoltIcon,
		},
		{
			name: 'Highly Customizable',
			description: 'Customize all the elements to fit your page needs.',
			icon: PencilAltIcon,
		},
		{
			name: 'Ready to Use Assets',
			description: 'Thousands of free to use and high quality images.',
			icon: PhotographIcon,
		},
		{
			name: 'Easy to Use',
			description:
				'Easier than ever, clear ways to get desired results in just few clicks.',
			icon: EmojiHappyIcon,
		},
		{
			name: 'Leads Export',
			description:
				'Get your excel sheet ready to use for mailing services in just one click.',
			icon: ClipboardCheckIcon,
		},
		{
			name: 'Mobile Optimized',
			description:
				'Highly converting and responsive elements to fit all mobile devices.',
			icon: DeviceMobileIcon,
		},
	]
	const faqs = [
		{
			id: 1,
			question: "What's the best thing about Switzerland?",
			answer:
				"I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		{
			id: 2,
			question: 'What is democracy?',
			answer:
				"It's got to do with some men killing each other. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
		},
		{
			id: 3,
			question: 'How do you make holy water? ',
			answer:
				'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
		},
		{
			id: 3,
			question: 'What do you call someone with no body and no nose?',
			answer:
				'Faceless void. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
		},
		{
			id: 4,
			question: 'Why did the invisible man turn down the job offer?',
			answer:
				'He could not see himself doing it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
		},
		{
			id: 5,
			question: 'Why do you never see elephants hiding in trees?',
			answer:
				'Because they are so good at it lol. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
		},
		// More questions...
	]
	return (
		<div>
			<MainHeader />
			<div className="bg-gray-50">
				<div className="relative overflow-hidden">
					<div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
						<div className="relative h-full">
							<svg
								className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
								width={404}
								height={784}
								fill="none"
								viewBox="0 0 404 784"
							>
								<defs>
									<pattern
										id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits="userSpaceOnUse"
									>
										<rect
											x={0}
											y={0}
											width={4}
											height={4}
											className="text-gray-200"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width={404}
									height={784}
									fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
								/>
							</svg>
							<svg
								className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
								width={404}
								height={784}
								fill="none"
								viewBox="0 0 404 784"
							>
								<defs>
									<pattern
										id="d2a68204-c383-44b1-b99f-42ccff4e5365"
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits="userSpaceOnUse"
									>
										<rect
											x={0}
											y={0}
											width={4}
											height={4}
											className="text-gray-200"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width={404}
									height={784}
									fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
								/>
							</svg>
						</div>
					</div>

					<div className="relative pt-6 pb-16 sm:pb-24">
						<div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
							<div className="text-center">
								<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
									<span className="block">Build fully featured funnels in</span>
									<span className="block text-indigo-600">
										Less than 10 minutes!
									</span>
								</h1>
								<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
									Create high-converting mobile funnels in no time, without
									design or coding skills. Easier & faster than ever.
								</p>
							</div>
						</div>
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex flex-col" aria-hidden="true">
							<div className="flex-1" />
							<div className="flex-1 w-full bg-gray-900" />
						</div>
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<img
								className="relative rounded-lg shadow-lg"
								src={HomeImage}
								alt="App screenshot"
							/>
						</div>
					</div>
				</div>
				<div className="bg-gray-900">
					<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
						<h2 className="text-center text-gray-400 text-xl font-semibold uppercase tracking-wide">
							Evolutionary software in the funnel marketing world!
						</h2>
					</div>
				</div>
			</div>
			<div className="relative bg-white py-16 sm:py-24 lg:py-32">
				<div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">
						Great Features!
					</h2>
					<p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Everything you need to make your funnels come to life
					</p>
					<p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
						Get started by building and deploying high performance funnels in
						just a few clicks. Amazing user experience and blazing fast
						publishing.
					</p>
					<div className="mt-12">
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{features.map((feature) => (
								<div key={feature.name} className="pt-6">
									<div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
										<div className="-mt-6">
											<div>
												<span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
													<feature.icon
														className="h-6 w-6 text-white"
														aria-hidden="true"
													/>
												</span>
											</div>
											<h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
												{feature.name}
											</h3>
											<p className="mt-5 text-base text-gray-500">
												{feature.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-gray-900">
				<div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
							We will help you all the way
						</h2>
						<p className="mt-3 text-xl text-indigo-200 sm:mt-4">
							Deliver what your customers want every time
						</p>
					</div>
					<dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
						<div className="flex flex-col">
							<dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
								Up time
							</dt>
							<dd className="order-1 text-5xl font-extrabold text-white">
								100%
							</dd>
						</div>
						<div className="flex flex-col mt-10 sm:mt-0">
							<dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
								Support
							</dt>
							<dd className="order-1 text-5xl font-extrabold text-white">
								24/7
							</dd>
						</div>
						<div className="flex flex-col mt-10 sm:mt-0">
							<dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
								Customizable Components
							</dt>
							<dd className="order-1 text-5xl font-extrabold text-white">
								10+
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<div className="bg-white">
				<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-gray-900 text-center">
						Frequently Asked Questions
					</h2>
					<div className="mt-12">
						<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
							{faqs.map((faq) => (
								<div key={faq.id}>
									<dt className="text-lg leading-6 font-medium text-gray-900">
										{faq.question}
									</dt>
									<dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
			<div className="relative bg-gray-900">
				<div className="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
					<img
						className="w-full h-full object-cover"
						src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
						alt=""
					/>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
					<div className="md:ml-auto md:w-1/2 md:pl-10">
						<h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
							Great tutorials
						</h2>
						<p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
							Everything you need to know
						</p>
						<p className="mt-3 text-lg text-gray-300">
							We will help you get started and have enough knowledge to build
							highly converting funnels with Funnelshero. You will gain access
							to valuable videos made for your success!
						</p>
						<div className="mt-8">
							<div className="inline-flex rounded-md shadow">
								<a
									href="#"
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
								>
									Visit the tutorials section
									<ExternalLinkIcon
										className="-mr-1 ml-3 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<MainFooter />
		</div>
	)
}

export default Home
