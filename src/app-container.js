// @flow
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {GoogleAuthProvider} from './google-auth-provider'
import {Login} from './components'
import {App} from './app'


export const AppContainer = () => (
    <BrowserRouter>
        <GoogleAuthProvider>
            {({isLoggedIn, onLogin}) => (
                isLoggedIn ? <App /> : <Login onLogin={onLogin} />
            )}
        </GoogleAuthProvider>
    </BrowserRouter>

)
