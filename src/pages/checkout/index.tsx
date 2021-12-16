import React, {useState, useEffect} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import {BundlesAxios} from '../../lib'


const SuccessDisplay = () => {
	const [email, setEmail] = useState('')

	const stripe = useStripe()
	const elements = useElements()
	const handleSubmitSub = async (event) => {
		try {

			if (!stripe || !elements) {
				// Stripe.js has not yet loaded.
				// Make sure to disable form submission until Stripe.js has loaded.
				return
			}
			const res = await BundlesAxios.post('/sub', {
				// 'payment_method': result.paymentMethod.id,
				'email': email,
			})
			// const result = await stripe.createPaymentMethod({
			// 	type: 'card',
			// 	card: elements.getElement(CardElement),
			// 	billing_details: {
			// 		email: email,
			// 	},
			// })
			// if (result.error) {
			// 	console.log(result.error.message)
			// } else {
			// 	const res = await BundlesAxios.post('/sub', {
			// 		'payment_method': result.paymentMethod.id,
			// 		'email': email,
			// 	})
				// eslint-disable-next-line camelcase
				// const {clientSecret, subStatus} = res.data
				// if (subStatus === 'requires_action') {
				// 	stripe.confirmCardPayment(clientSecret).then((result) => {
				// 		if (result.error) {
				// 			console.log('There was an issue!')
				// 			console.log(result.error)
				// 			// Display error message in your UI.
				// 			// The card was declined (i.e. insufficient funds, card has expired, etc)
				// 		} else {
				// 			console.log('You got the money!')
				// 			// Show a success message to your customer
				// 		}
				// 	}).catch(err => {
				// 		if (err.response) {
				// 			console.log(err.response.data)
				// 		} else {
				// 			console.log(err)
				// 		}
				// 	})
				// } else {
				console.log('You got the money!')
				// No additional information was needed
				// Show a success message to your customer
				// }
			// }
		} catch (err) {
			if (err.response) {
				console.log(err.response.data)
			} else {
				console.log(err)
			}
		}
	}
	const CARD_ELEMENT_OPTIONS = {
		style: {
			base: {
				'color': '#32325d',
				'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
				'fontSmoothing': 'antialiased',
				'fontSize': '16px',
				'::placeholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	}
	return (

		<div>
			<div>
				<input
					id='outlined-email-input'
					type='email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<CardElement options={CARD_ELEMENT_OPTIONS} />
				<div>

					<button color='primary' onClick={handleSubmitSub}>
						Subscription
					</button>
				</div>
			</div>
		</div>
	)
}
export default SuccessDisplay


