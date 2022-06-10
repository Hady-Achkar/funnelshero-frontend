import React, {useEffect} from 'react'
import {CameraIcon} from '@heroicons/react/solid'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

const Privacy = () => {
	const privacy = [
		{
			title: 'Scope of this Privacy Policy; Information Collected',
			desciption: [
				'Any Submission or other information you provide or is otherwise accessible to Funnelshero (including from ancillary services such as Facebook or Google+, as well as Apple or Android application markets, all owned and/or operated by their respective owners, is considered, for the purpose of these Terms and Conditions and this Privacy Policy hereunder, as Personally Identifiable Information. This Privacy Policy does not apply to any act or omission of any other person, third party entity or corporation, which Funnelshero does not own or control, or to individuals whom Funnelshero does not employ or manage, including any of the third parties to which Funnelshero may disclose user information as set forth in this Privacy Policy',
				'The contents of Submissions that have been delivered by the Funnelshero Service or Application may not necessarily copied, kept or archived by Funnelshero in the normal course of business. You may not rely on Funnelshero in any way with respect to maintaining records of you activity.',
			],
		},
		{
			title: 'Use of Information by Funnelshero',
			desciption: [
				'Funnelshero uses the Personally Identifiable Information you submit to us through the Application or Service, to operate, maintain, and provide to you the features and functionality of the Service. Funnelshero may use non-personally- identifiable information (including user usage data, cookies, IP addresses, browser type, clickstream data, etc.) to improve the quality and design of the Funnelshero Application and Service.',
			],
		},
		{
			title: 'Collection of Information',
			desciption: [
				'The Operator complies with web browser’s mechanisms to allow choice. When using the Application, you may choose to stop sharing information at any time using your browser’s settings to disable the Application add-on. This will not erase historic data. For erasure request please email: service@Funnelshero.com',
			],
		},
		{
			title: 'Use of your Information',
			desciption: [
				'Funnelshero will not sell or share your Personally Identifiable Information (such as mobile phone number) with other third-  party without your consent or except as part of a specific offer or program or feature for which you will have the ability to either opt-in or opt-out, and which may not financially charge you without your consent. We may collect personally identifiable information about individual online activities over time and across different websites using the Website, Application and Services',
			],
		},
		{
			title: 'Data Security',
			desciption: [
				'Funnelshero uses reasonable commercially reasonable physical and technical safeguards to preserve the integrity and security of your personal information. Funnelshero can not and does not ensure or warrant the security of any information  or Submission transmitted. Avoid unsecured or unprotected networks to submit messages through the Funnelshero Service ',
			],
		},
		{
			title: 'Children-s Privacy',
			desciption: [
				'If you are under 16 years of age, then please do not use the Funnelshero Service or access the Funnelshero Site at any time or in any manner. If Funnelshero learns that Personally Identifiable Information of persons under 16 years of age has  been collected using the Service, then Funnelshero may deactivate the account and/or remove the Submissions or render them inaccessible',
			],
		},
		{
			title: 'Event of Merger, Sale, or Liquidation',
			desciption: [
				'In the event that Operator is acquired by or merged with a third party entity, we reserve the right (or in the event of liquidation, as provided under law) to transfer or assign the information collected from our users as part of such merger, acquisition, sale, or other change of control',
			],
		},
	]

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<React.Fragment>
			<Header />
			<div
				className="overflow-hidden text-left"
				style={{textDecoration: 'auto', direction: 'ltr'}}
			>
				<div className=" max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white mt-8 rounded shadow-sm">
					<div className="">
						<h2 className="font-semibold text-2xl">Privacy Settings</h2>
						<br />
						<div>
							<div className="text-base mx-auto lg:max-w-none">
								{privacy.map((item, index) => (
									<div key={index}>
										<p className="text-lg text-gray-700">{item.title}</p>
										<br />
										{item.desciption.map((element, i) => (
											<div key={i}>
												<p className="text-md text-gray-500">{element}</p>
												<br />
											</div>
										))}
										<br />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	)
}
export default Privacy
