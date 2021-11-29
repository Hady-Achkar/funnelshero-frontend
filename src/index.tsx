import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import App from './App'
import {store, persistor} from './lib'
import {PersistGate} from 'redux-persist/integration/react'
import Loading from './components/common/Loading'

const history = createBrowserHistory()
const renderApp = () => {
	ReactDOM.render(
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<Loading />}>
				<Router history={history}>
					<App />
				</Router>
			</PersistGate>
		</Provider>,
		document.getElementById('root')
	)
}

renderApp()
