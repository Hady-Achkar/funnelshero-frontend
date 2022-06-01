import React, {useCallback, useState} from 'react'
import {startGoogleLogin, startLogin} from '../../actions'
import {Link} from 'react-router-dom'
import {LoginPayload} from '../../services'
import {useDispatch} from 'react-redux'
import FacebookSvg from '../../assets/icons/facebook-svgrepo-com.svg'
import GoogleLogin, {GoogleLoginResponse} from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
const Signin = () => {
	const [userData, setUserData] = useState<LoginPayload>()
	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}, [])
	const isDisabled = Boolean(
		userData?.email === '' || userData?.password === ''
	)

	const [googleUserData, setGoogleUserData] = useState({
		fname: '',
		lname: '',
		email: '',
	})

	const dispatch = useDispatch()
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(startLogin(userData))
	}

	const handleGoogleFailure = (result) => {
		alert(result)
	}

	const handleGoogleLogin = (googleData: GoogleLoginResponse) => {
		const {givenName, familyName, email} = googleData.profileObj
		dispatch(
			startGoogleLogin({fname: givenName, lname: familyName, email: email})
		)
	}
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<img
					className="mx-auto h-12 w-auto"
					src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
					alt="Workflow"
				/>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Or{' '}
					<Link
						to="/pricing"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						start your 14-day free trial
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									onChange={handleChange}
									autoComplete="email"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									onChange={handleChange}
									autoComplete="current-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<Link
									to="/forgot-password"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Forgot your password?
								</Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isDisabled}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign in
							</button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<div>
								<Link
									to="/facebook-auth"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								>
									<span className="sr-only">Sign in with Facebook</span>
									<img src={FacebookSvg} />
								</Link>
							</div>

							<div>
								<GoogleLogin
									clientId="288554052846-cs2t1i01nuic6k9hd8agopmm8tjvp4oh.apps.googleusercontent.com"
									onSuccess={handleGoogleLogin}
									onFailure={handleGoogleFailure}
									render={(renderProps) => (
										<button
											onClick={renderProps.onClick}
											className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
										>
											<span className="sr-only">Sign in with GitHub</span>
											<svg
												width="24px"
												height="24px"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												xmlnsXlink="http://www.w3.org/1999/xlink"
											>
												<path
													fill="#EA4335 "
													d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
												/>
												<path
													fill="#34A853"
													d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
												/>
												<path
													fill="#4A90E2"
													d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
												/>
												<path
													fill="#FBBC05"
													d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
												/>
											</svg>
										</button>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signin
