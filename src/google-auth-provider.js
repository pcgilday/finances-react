// @flow
import {
    bindKey,
} from 'lodash'
import {Component} from 'react'
import {GOOGLE_CLIENT_ID, GOOGLE_DISCOVERY_DOCS, GOOGLE_SCOPE} from './config'

const getGoogleApiConfig = () => ({
    clientId: GOOGLE_CLIENT_ID,
	discoveryDocs: GOOGLE_DISCOVERY_DOCS,
	scope: GOOGLE_SCOPE,
})

type State = {|
    gapi: any,
    isLoggedIn: boolean,
|}

export class GoogleAuthProvider extends Component {
    constructor() {
        super()
        this.state = {
            gapi: window.gapi,
            isLoggedIn: false,
        }
    }

    state: State

    loadAuthClient() {
        const {gapi} = this.state

        gapi.load("client:auth2", () => {
            gapi.client.init(getGoogleApiConfig())
                .then(() => {
                    this.setState({
                        isLoggedIn: gapi.auth2.getAuthInstance().isSignedIn.get()
                    })
                    gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.listen(() => {
                            this.setState({
                                isLoggedIn: gapi.auth2.getAuthInstance().isSignedIn.get()
                            })
                        })
                })
        })
    }

    componentDidMount() {
        this.loadAuthClient()
    }

    handleLogin() {
        const {gapi} = this.state
        gapi.auth2.getAuthInstance().signIn();
    }

    render() {
        const loginProps = {
            isLoggedIn: this.state.isLoggedIn,
            onLogin: bindKey(this, 'handleLogin'),
        }
        return (this.props.children(loginProps))
    }
}

