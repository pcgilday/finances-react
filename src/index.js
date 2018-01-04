// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import {AppContainer} from './app-container'


ReactDOM.render((
    <AppContainer />
), document.getElementById("root"))

registerServiceWorker()
