// @flow
import React, {Component} from 'react'
import type {Transaction, BudgetItem} from '../flowtypes'
import {fetchSheetFinances} from '../fetch-sheet-finances'

type State = {|
    transactions: Array<Transaction>,
    budgets: Array<BudgetItem>,
|}

// FIXME - WrappedComponent type
export const connectFinances = () => (WrappedComponent) =>
    class FinancesContainer extends Component {
        constructor() {
            super()
            this.state = {
                transactions: [],
                budgets: [],
            }
        }

        state: State

        componentDidMount() {
            return fetchSheetFinances(window.gapi.client)
                .then((data) => {
                    return this.setState(data)
                })
        }
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state} />
            )
        }
    }
