// @flow
import {get} from 'lodash'
import React from 'react'
import styled from 'styled-components'


export const fontSizes = ['10px', '12px', '14px', '16px', '24px', '40px']
export const spacing = ['0.5rem', '1rem', '2rem', '4rem', '8rem', '16rem']
export const spacingReadingCol = '40rem'

// http://clrs.cc/
export const colors = {
    gray: '#AAAAAA',
    green: '#2ECC40',
    blue: '#0074D',
    red: '#FF4136',
    white: '#FFFFFF',
}


type HeadingProps = {|
    size: 1 | 2 | 3 | 4 | 5 | 6,
    // FIXME
    children: any,
|}

// Doesn't evan properly, as long as children is passed
// this is fine.
/* eslint-disable jsx-a11y/heading-has-content */
export const Heading = ({size, ...props}: HeadingProps) => {
    switch(size) {
        case 1:
            return <h1 {...props} />
        case 2:
            return <h2 {...props} />
        case 3:
            return <h3 {...props} />
        default:
            // FIXME throw error
            return <h1 {...props} />
    }
}


export const Table = styled.table`
    margin: ${props => props.spacing};
    border-collapse: collapse;
    width: 100%;
`

export const TableRow = (props: any) => (
    <tr {...props} />
)

export const TableHeaderCell = styled.th`
    padding-bottom: ${spacing[0]};
    text-align: left;
`

export const TableHeader = (props: any) => (
    <thead {...props} />
)

export const TableBody = styled.tbody`
    padding-bottom: ${spacing[0]};
`

export const TableCell = styled.td`
    padding-bottom: ${spacing[0]};
    padding-top: ${spacing[0]};
    border-bottom: 1px solid ${colors.gray};
`

export const Text = styled.span`
    font-size: ${(props: any) => fontSizes[get(props, 'size', 3)]};
    font-weight: ${(props: any) => props.bold ? 'bold' : 'normal'}
`

export const Flex = styled.div`
    display: flex;
    align-items: ${props => props.alignItems ? props.alignItems : 'stretch'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
`

export const ContentPage = styled.div`
    max-width: ${spacingReadingCol};
    padding-left: ${spacing[1]};
    padding-right: ${spacing[1]};
`

