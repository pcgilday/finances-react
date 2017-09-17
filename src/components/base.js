// @flow
import React from 'react'
import {space, width, fontSize, color} from 'styled-system'
import styled from 'styled-components'
import theme from './theme'


export const Table = styled.table`
    margin: ${props => props.spacing};
    border-collapse: collapse;
    width: 100%;
    ${space}
    ${width}
    ${fontSize}
    ${color}
`

export const TableRow = styled.tr`
    ${space}
    ${width}
    ${fontSize}
    ${color}
`

export const TableHeaderCell = styled.th`
    padding-bottom: ${theme.space[0]};
    text-align: left;
    ${space}
    ${width}
    ${fontSize}
    ${color}
`

export const TableHeader = (props: any) => (
    <thead {...props} />
)

export const TableBody = styled.tbody`
    padding-bottom: ${theme.space[0]};
    ${space}
    ${width}
    ${fontSize}
    ${color}
`

export const TableCell = styled.td`
    border-bottom: 1px solid ${theme.colors.gray};
    ${space}
    ${width}
    ${fontSize}
    ${color}
`




