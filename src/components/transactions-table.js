// @flow
import {
    map,
} from 'lodash'
import React from 'react'
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


export const TransactionsTable = ({
    transactions,
}: {
    transactions: Array<Transaction>,
}) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderCell>
                    {'Date'}
                </TableHeaderCell>
                <TableHeaderCell>
                    {'Name'}
                </TableHeaderCell>
                <TableHeaderCell>
                    {'Amount'}
                </TableHeaderCell>
                <TableHeaderCell>
                    {'Category'}
                </TableHeaderCell>
            </TableRow>
        </TableHeader>
        <TableBody>
            {map(transactions, ({amount, date, name, category, notes, id}) => (
                <TableRow key={id} >
                    <TableCell py={2}>
                        {moment(date).format('MMM D')}
                    </TableCell>
                    <TableCell py={2} >
                        {name}
                    </TableCell>
                    <TableCell py={2}>
                        {formatCurrency(amount)}
                    </TableCell>
                    <TableCell py={2}>
                        {category}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)

