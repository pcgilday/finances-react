// @flow
import React from 'react'


export const Login = ({onLogin}: {onLogin: () => void}) => (
    <div>
        <button onClick={onLogin} >
            {'Login via Google'}
        </button>
    </div>
)
