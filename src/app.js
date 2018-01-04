// @flow
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {Provider as ThemeProvider, Box} from 'rebass'

import {
    Dashboard,
    TransactionsByMonth,
} from './components'
import theme from './components/theme'
import {Navigation} from './components/navigation'


const navItems = [
    {label: 'Dashboard', url: '/dashboard'},
    {label: 'Transactions', url: '/transactions'},
]

export const App = () => (
    <ThemeProvider theme={theme}>
        <Navigation items={navItems}/>
        <Box mx={1} >
            <Redirect from='/' to='/dashboard' exact />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/transactions' component={TransactionsByMonth} />
        </Box>
    </ThemeProvider>
)


