import {
    map,
    sumBy,
} from 'lodash'
import React from 'react'
import {compose, withProps} from 'recompose'
import styled from 'styled-components'

import {Link, Route} from 'react-router-dom'

import {connectMonthlyFinances} from './connect-monthly-finances'

import {
    Dashboard,
    MonthlyTransactions,
} from './components'
import {
    Flex,
    colors,
    fontSizes,
} from './components/base'


const IncomeContainer = compose(
    connectMonthlyFinances(),
    withProps(({monthlyFinances}) => ({
        monthlyTransactions: map(monthlyFinances, ({month, income, expenses}) => ({
            month,
            transactions: income,
            expenseTotal: sumBy(expenses, 'amount'),
            incomeTotal: sumBy(income, 'amount'),
        })),
    })),
)(MonthlyTransactions)

const ExpensesContainer = compose(
    connectMonthlyFinances(),
    withProps(({monthlyFinances}) => ({
        monthlyTransactions: map(monthlyFinances, ({month, expenses, income}) => ({
            month,
            transactions: expenses,
            expenseTotal: sumBy(expenses, 'amount'),
            incomeTotal: sumBy(income, 'amount'),
        })),
    })),
)(MonthlyTransactions)

const DashboardContainer = connectMonthlyFinances()(Dashboard)


const StyledLink = styled(Link)`
    background-color: light-gray;
    color: ${colors.white};
    font-weight: 'bold';
    font-size: ${fontSizes[3]};
    text-decoration: none;
    padding: 1rem;
`

const Nav = styled.nav`
    background-color: ${colors.green};
`

export const App = ({expenses}) => (
    <div>
        <Nav>
            <Flex>
                <StyledLink to='/dashboard'>{'Dashboard'}</StyledLink>
                <StyledLink to='/expenses'>{'Expenses'}</StyledLink>
                <StyledLink to='/income'>{'Income'}</StyledLink>
            </Flex>
        </Nav>
        <div>
            <Route path='/dashboard' component={DashboardContainer} />
            <Route path='/expenses' component={ExpensesContainer} />
            <Route path='/income' component={IncomeContainer} />
        </div>
    </div>
)


