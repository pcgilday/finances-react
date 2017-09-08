// @flow
import {
    map,
} from 'lodash'
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import type {Transaction} from '../flowtypes'
import {formatCurrency} from '../formatting'
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell,
} from './base'


type Props  = {|
    transactions: Array<Transaction>,
|}

const StyledTable = styled(Table)`
    max-width: 1000px;
`

export const TransactionsTable = ({transactions}: Props) => (
    <StyledTable >
        <TableHeader>
            <TableRow>
                <TableHeaderCell>
                    {'Date'}
                </TableHeaderCell>
                <TableHeaderCell>
                    {'Name'}
                </TableHeaderCell>
                <TableHeaderCell>
                    {'Category'}
                </TableHeaderCell>
                <TableHeaderCell>
                    {'Notes'}
                </TableHeaderCell>
            </TableRow>
        </TableHeader>
        <TableBody>
            {map(transactions, ({amount, date, name, category, notes, id}) => (
                <TableRow key={id} >
                    <TableCell>
                        {moment(date).format('MMM D')}
                    </TableCell>
                    <TableCell>
                        {name}
                    </TableCell>
                    <TableCell >
                        {formatCurrency(amount)}
                    </TableCell>
                    <TableCell>
                        {category}
                    </TableCell>
                    <TableCell>
                        {notes}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </StyledTable>
)

