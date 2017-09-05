// @flow
import React, {Component} from 'react'
import type {Transaction, BudgetItem} from './flowtypes'
import {fetchSheetData} from './sheets'


type State = {|
    expenses: Array<Transaction>,
    income: Array<Transaction>,
    accounts: Array<string>,
    categories: Array<string>,
    budgets: Array<BudgetItem>,
|}

// FIXME - WrappedComponent type
export const connectFinances = () => (WrappedComponent) =>
    class FinancesContainer extends Component {
        constructor() {
            super()
            this.state = {
                expenses: [],
                accounts: [],
                categories: [],
                income: [],
                budgets: [],
            }
        }

        state: State

        componentDidMount() {
            return fetchSheetData(window.gapi.client)
                .then((data) => {
                    return this.setState(data)
                })
        }
        render() {
            return (<WrappedComponent
                {...this.props}
                {...this.state}
            />)
        }
    }
