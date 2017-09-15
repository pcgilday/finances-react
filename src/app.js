import React from 'react'
import {Route} from 'react-router-dom'
import {Provider as ThemeProvider, Box} from 'rebass'

import {
    DashboardContainer,
    ExpensesContainer,
    IncomeContainer,
} from './containers'
import theme from './components/theme'
import {Navigation} from './components/navigation'


const navItems = [
    {label: 'Dashboard', url: '/dashboard'},
    {label: 'Expenses', url: '/expenses'},
    {label: 'Income', url: '/income'},
]

export const App = ({expenses}) => (
    <ThemeProvider theme={theme}>
        <Navigation items={navItems}/>
        <Box mx={1}>
            <Route path='/dashboard' component={DashboardContainer} />
            <Route path='/expenses' component={ExpensesContainer} />
            <Route path='/income' component={IncomeContainer} />
        </Box>
    </ThemeProvider>
)


