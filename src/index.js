import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import {App} from './app'
import {GoogleAuthProvider} from './google-auth'
import registerServiceWorker from './registerServiceWorker'


const Login = ({signIn}) => (
    <div>
        <button onClick={signIn} >
            {'SignIn'}
        </button>
    </div>
)

const AppContainer = () => (
    <BrowserRouter>
        <GoogleAuthProvider>
            {({isLoggedIn, onSignIn}) => (
                isLoggedIn ? <App /> : <Login signIn={onSignIn} />
            )}
        </GoogleAuthProvider>
    </BrowserRouter>

)

ReactDOM.render((
    <AppContainer />
), document.getElementById("root"))
registerServiceWorker()
