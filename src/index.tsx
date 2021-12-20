import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import App from './App'
import {store, persistor} from './lib'
import {PersistGate} from 'redux-persist/integration/react'
import Loading from './components/common/Loading'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {FetchStripeKey} from './services'

const history = createBrowserHistory()
const renderApp = () => {
	FetchStripeKey()
		.then((res) => {
			const {publicKey} = res.data
			const stripePromise = loadStripe(publicKey)
			ReactDOM.render(
				<Provider store={store}>
					<PersistGate persistor={persistor} loading={<Loading />}>
						<Elements stripe={stripePromise}>
							<Router history={history}>
								<App />
							</Router>
						</Elements>
					</PersistGate>
				</Provider>,
				document.getElementById('root')
			)
		})
		.catch((err) => {
			if (err.response) {
				console.log(err.reponse.data)
			} else {
				console.log(err)
			}
		})
}

renderApp()
